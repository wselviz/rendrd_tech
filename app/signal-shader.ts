/** A quiet, procedural signal field. The hero owns the clock and motion controls. */
export function createSignalShader(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
  };
  const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.,1.);}");
  const fragment = compile(gl.FRAGMENT_SHADER, `
    precision mediump float;
    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform float u_time;
    uniform float u_progress;
    uniform float u_dark;
    float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
    float bar(float p,float width){return 1.-smoothstep(width,width+.025,abs(p));}
    void main(){
      vec2 uv=gl_FragCoord.xy/u_resolution;
      vec2 p=(uv-.5)*vec2(u_resolution.x/u_resolution.y,1.);
      p+=u_pointer*.014;
      float wave=sin(p.x*5.+p.y*3.+u_time*.11)*.10;
      float field=length(p-vec2(-.48+wave,.05))+.045*sin(p.y*11.-u_time*.16);
      float contour=pow(.5+.5*cos(field*93.-u_time*.12),28.);
      vec2 grid=uv*u_resolution/22.;
      vec2 cell=floor(grid), q=fract(grid)-.5;
      float seed=hash(cell);
      float slash=bar(q.x+q.y,.032)*step(abs(q.x),.18)*step(abs(q.y),.18);
      float plus=max(bar(q.x,.025)*step(abs(q.y),.13),bar(q.y,.025)*step(abs(q.x),.13));
      float dot=1.-smoothstep(.025,.055,length(q));
      float glyph=seed>.96?plus:(seed>.92?slash:dot);
      float breathe=.6+.4*sin(field*12.-u_time*.22+seed*5.);
      float marks=glyph*step(.82,seed)*(.3+.7*breathe);
      // Leave the sales message optically clean; detail lives in the letter field.
      float safe=1.-smoothstep(.30,.43,uv.x)*(1.-smoothstep(.57,.77,uv.y));
      float edge=smoothstep(.01,.1,uv.x)*(1.-smoothstep(.96,1.,uv.x));
      float strength=(contour*.075+marks*.24)*safe*edge*(1.-u_progress*.4);
      vec3 ink=mix(vec3(.52,.19,.12),vec3(1.,.42,.25),u_dark);
      gl_FragColor=vec4(ink,strength);
    }
  `);
  if (!vertex || !fragment) { shaders.forEach(s => gl.deleteShader(s)); return null; }
  const program = gl.createProgram()!;
  gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s)); return null; }
  const buffer = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const uniforms = Object.fromEntries(["resolution","pointer","time","progress","dark"].map(name => [name, gl.getUniformLocation(program, "u_"+name)]));
  canvas.dataset.shader = "ready";
  let lastTime = -1, lastProgress = -1, lastDark = false, lost = false;
  const contextLost = () => { lost = true; canvas.dataset.shader = "fallback"; };
  canvas.addEventListener("webglcontextlost", contextLost);
  return {
    resize(width: number, height: number) {
      // Decorative texture needs one physical pixel per CSS pixel at most.
      const scale = Math.min(1, 1400 / width);
      canvas.width = Math.round(width * scale); canvas.height = Math.round(height * scale);
      gl.viewport(0, 0, canvas.width, canvas.height); lastTime = -1;
    },
    render(time: number, progress: number, pointer: {x: number;y: number}, dark: boolean) {
      if (lost || (time-lastTime<32 && progress===lastProgress && dark===lastDark)) return;
      lastTime=time; lastProgress=progress; lastDark=dark;
      gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      gl.uniform2f(uniforms.pointer, pointer.x, -pointer.y);
      gl.uniform1f(uniforms.time, time/1000); gl.uniform1f(uniforms.progress, progress); gl.uniform1f(uniforms.dark, dark?1:0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    dispose() {
      canvas.removeEventListener("webglcontextlost", contextLost);
      gl.deleteBuffer(buffer); gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s));
    }
  };
}
