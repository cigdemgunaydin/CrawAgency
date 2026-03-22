"use client";

import { useEffect, useRef, useState, useCallback, CSSProperties } from "react";

interface BrokenGlassProps {
  image: string;
  distance?: number;
  edgeThickness?: number;
  breakAgain?: boolean;
  style?: CSSProperties;
}

export default function BrokenGlass({
  image,
  distance = 0.1,
  edgeThickness = 0.3,
  breakAgain = true,
  style = {},
}: BrokenGlassProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const imageObjRef = useRef<HTMLImageElement | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const pointerRef = useRef({ x: 0.55, y: 0.5 });
  const clickRandomizerRef = useRef(0.332);
  const [imageReady, setImageReady] = useState(false);
  const imageReadyRef = useRef(false);
  const [isBroken, setIsBroken] = useState(false);
  const isBrokenRef = useRef(false);

  const distanceRef = useRef(distance * 0.2);
  const edgeThicknessRef = useRef(edgeThickness * 0.02);

  const canvasScale = 1.3;
  const innerScale = 1;

  useEffect(() => { imageReadyRef.current = imageReady; }, [imageReady]);
  useEffect(() => { isBrokenRef.current = isBroken; }, [isBroken]);
  useEffect(() => { distanceRef.current = distance * 0.2; }, [distance]);
  useEffect(() => { edgeThicknessRef.current = edgeThickness * 0.02; }, [edgeThickness]);

  const vertexShader = `
    precision mediump float;
    varying vec2 vUv;
    attribute vec2 a_position;
    void main() {
      vUv = .5 * (a_position + 1.);
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShader = `
    precision highp float;
    precision highp sampler2D;
    varying vec2 vUv;
    uniform sampler2D u_image_texture;
    uniform float u_edge_thickness;
    uniform float u_ratio;
    uniform vec2 u_pointer_position;
    uniform float u_img_ratio;
    uniform float u_click_randomizer;
    uniform float u_effect;
    uniform float u_effect_active;
    uniform float u_inner_scale;
    uniform float u_canvas_scale;
    #define TWO_PI 6.28318530718
    #define PI 3.14159265358979323846
    float random(float x){return fract(sin(x*12.9898)*43758.5453);}
    float random2(vec2 p){return fract(sin(dot(p.xy,vec2(12.9898,78.233)))*43758.5453);}
    float noise(vec2 p){vec2 ip=floor(p);vec2 u=fract(p);u=u*u*(3.0-2.0*u);return pow(mix(mix(random2(ip),random2(ip+vec2(1,0)),u.x),mix(random2(ip+vec2(0,1)),random2(ip+vec2(1,1)),u.x),u.y),2.);}
    float get_sector_shape(float d,float a,float angle,float edges){float a1=PI;float a2=a1+angle;return smoothstep(a1-edges/d,a1+edges/d,a)*(1.-smoothstep(a2-edges/d,a2+edges/d,a));}
    float get_img_frame_alpha(vec2 uv,float w){return smoothstep(0.,w,uv.x)*smoothstep(1.,1.-w,uv.x)*smoothstep(0.,w,uv.y)*smoothstep(1.,1.-w,uv.y);}
    float get_simple_cracks(float a,float d,float n){a*=(1.+sin(2.*a+PI+2.*u_click_randomizer));float s=10.;float st=TWO_PI/s;float sa=mod(a+n+u_click_randomizer,st);float c=4.*abs(sa-.5*st);c=mix(c,1.,smoothstep(.9,1.,d));c*=pow(d+.4*u_click_randomizer*max(0.,cos(2.*a+u_click_randomizer)*sin(a)),12.);return(1.+n)*(1.+sin(4.*a))*step(.9,c);}
    vec2 get_img_uv(){vec2 uv=vUv-0.5;uv*=u_canvas_scale;float ca=u_ratio;float ia=u_img_ratio;vec2 sc=vec2(1.0);if(ca>ia)sc.y=ia/ca;else sc.x=ca/ia;uv*=sc;uv/=u_inner_scale;return uv+0.5;}
    vec2 get_frame_uv(){vec2 uv=vUv-0.5;uv*=u_canvas_scale;uv/=u_inner_scale;return uv+0.5;}
    vec2 get_disturbed_uv(vec2 uv,float sc,float edge,vec2 dir,float border){float d=u_effect*(sc-.5);vec2 du=uv;du+=2.*d;du.x-=mix(.03*edge*dir.x,-.1*edge,border);du.y-=mix(.03*edge*dir.y,-.1*edge,border);vec2 c=vec2(.5);du-=c;float ca=cos(4.*d);float sa=sin(4.*d);float p=1.+d*du.y;du=vec2(p*(ca*du.x-sa*du.y),p*(sa*du.x+ca*du.y));return du+c;}
    void main(){vec2 uv=vUv;uv.y=1.-uv.y;uv.x*=u_ratio;vec2 ptr=u_pointer_position;vec2 pd=normalize(u_pointer_position-vec2(vUv.x,1.-vUv.y));ptr.x*=u_ratio;ptr=ptr-uv;float pa=atan(ptr.y,ptr.x);float pdn=1.-clamp(length(ptr),0.,1.);vec2 img_uv=get_img_uv();float sc=0.;float ssa=0.;float ise=0.;float ige=0.;float ice=0.;float an=.3*noise(3.*img_uv);for(int i=0;i<12;i++){float ss=float(i)+u_click_randomizer+2.;float anm=mod((pa-ssa)/TWO_PI,1.)+.1*an;float a=anm*TWO_PI;float sz=min(.01+2.*random2(vec2(float(i)+u_click_randomizer,u_pointer_position.x)),TWO_PI-ssa);float th=u_edge_thickness*(.2+random(3.*ss))+an*.03*pow(pdn,80.);float sh=get_sector_shape(length(ptr),a,sz,th);ise=max(ise,smoothstep(.6,1.,sh));sc=mix(sc,random(ss),smoothstep(.2,.8,sh));vec2 gu=2.*(.8+.5*pdn)*img_uv;float gn=noise(gu+ss);float gt=(.4+.4*random(10.*ss))*u_edge_thickness;float gs=sh*smoothstep(.27,.27+gt,gn);ige+=smoothstep(.1,.5,gs)*smoothstep(.9,.6,gs);sc=mix(sc,random(ss+100.),smoothstep(.2,.8,gs));vec2 cu=img_uv*(3.+3.*pow(pdn,10.));float cn=noise(cu+ss);float ct=(1.+.5*random(-2.+ss))*u_edge_thickness;float cs=step(.7,sh)*smoothstep(.27,.27+ct,cn);ice+=smoothstep(0.,.5,cs)*smoothstep(1.,.5,cs);ice*=step(.8,pdn);sc=mix(sc,random(ss+100.),smoothstep(.2,.8,cs));ssa+=sz;}vec2 fu=get_frame_uv();float ia=get_img_frame_alpha(fu,.004);ise=1.-ise;float ce=max(ige,ise);ce=max(ce,ice);ce+=get_simple_cracks(pa,pdn,an);if(u_effect_active>0.){float b=get_img_frame_alpha(fu,.2);img_uv=get_disturbed_uv(img_uv,sc,ce,pd,b);fu=get_disturbed_uv(fu,sc,ce,pd,b);}vec4 img=texture2D(u_image_texture,vec2(img_uv.x,1.-img_uv.y));vec3 col=img.rgb+.12*u_effect_active*(sc-.5);ia=get_img_frame_alpha(fu,.004);float op=ia-.3*u_effect_active*pow(ige,4.)-.3*u_effect_active*ice-.03*u_effect_active*pow(get_simple_cracks(pa,pdn,an),4.);gl_FragColor=vec4(col,op);}
  `;

  const initShader = useCallback((gl: WebGLRenderingContext) => {
    const createShader = (src: string, type: number) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { gl.deleteShader(s); return null; }
      return s;
    };
    const vs = createShader(vertexShader, gl.VERTEX_SHADER);
    const fs = createShader(fragmentShader, gl.FRAGMENT_SHADER);
    if (!vs || !fs) return false;
    const prog = gl.createProgram();
    if (!prog) return false;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);
    const uc = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uc; i++) {
      const info = gl.getActiveUniform(prog, i);
      if (info) uniformsRef.current[info.name] = gl.getUniformLocation(prog, info.name);
    }
    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    return true;
  }, []);

  const updateUniforms = useCallback(() => {
    const gl = glRef.current;
    const u = uniformsRef.current;
    if (!gl) return;
    if (u.u_click_randomizer) gl.uniform1f(u.u_click_randomizer, clickRandomizerRef.current);
    if (u.u_effect) gl.uniform1f(u.u_effect, distanceRef.current);
    if (u.u_effect_active) gl.uniform1f(u.u_effect_active, isBrokenRef.current ? 1 : 0);
    if (u.u_edge_thickness) gl.uniform1f(u.u_edge_thickness, edgeThicknessRef.current);
    if (u.u_pointer_position) gl.uniform2f(u.u_pointer_position, pointerRef.current.x, pointerRef.current.y);
    if (u.u_inner_scale) gl.uniform1f(u.u_inner_scale, innerScale);
    if (u.u_canvas_scale) gl.uniform1f(u.u_canvas_scale, canvasScale);
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const gl = glRef.current;
    const img = imageObjRef.current;
    const u = uniformsRef.current;
    if (!canvas || !container || !gl || !img) return;
    const w = container.clientWidth || 1;
    const h = container.clientHeight || 1;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(2, Math.round(w * canvasScale * dpr));
    canvas.height = Math.max(2, Math.round(h * canvasScale * dpr));
    canvas.style.width = `${w * canvasScale}px`;
    canvas.style.height = `${h * canvasScale}px`;
    gl.viewport(0, 0, canvas.width, canvas.height);
    if (u.u_ratio) gl.uniform1f(u.u_ratio, w / h);
    if (u.u_img_ratio) gl.uniform1f(u.u_img_ratio, img.naturalWidth / img.naturalHeight);
  }, []);

  useEffect(() => {
    if (!image) return;
    setIsBroken(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: false });
    if (!gl) return;
    glRef.current = gl;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    if (!initShader(gl)) return;
    const img = new Image();
    img.crossOrigin = "anonymous";
    imageObjRef.current = img;
    img.onload = () => {
      const tex = gl.createTexture();
      textureRef.current = tex;
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      if (uniformsRef.current.u_image_texture) gl.uniform1i(uniformsRef.current.u_image_texture, 0);
      resizeCanvas();
      updateUniforms();
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      setImageReady(true);
      imageReadyRef.current = true;
    };
    img.src = image;
    const handleResize = () => {
      resizeCanvas();
      if (gl && imageReadyRef.current) { updateUniforms(); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4); }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (gl && textureRef.current) { gl.deleteTexture(textureRef.current); textureRef.current = null; }
    };
  }, [image, initShader, resizeCanvas, updateUniforms]);

  useEffect(() => {
    if (imageReady && glRef.current) { updateUniforms(); glRef.current.drawArrays(glRef.current.TRIANGLE_STRIP, 0, 4); }
  }, [distance, edgeThickness, isBroken, imageReady, updateUniforms]);

  const handleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    if (!canvas || !gl) return;
    const rect = canvas.getBoundingClientRect();
    if (breakAgain) {
      if (!isBroken) {
        pointerRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
        clickRandomizerRef.current = Math.random();
        isBrokenRef.current = true;
        updateUniforms(); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        setIsBroken(true);
      } else {
        isBrokenRef.current = false;
        updateUniforms(); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        setIsBroken(false);
      }
    } else if (!isBroken) {
      pointerRef.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
      clickRandomizerRef.current = Math.random();
      isBrokenRef.current = true;
      updateUniforms(); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      setIsBroken(true);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "visible",
        cursor: !breakAgain && isBroken ? "default" : "pointer",
      }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        style={{
          position: "absolute",
          top: "-15%",
          left: "-15%",
          display: "block",
          opacity: imageReady ? 1 : 0,
        }}
      />
    </div>
  );
}
