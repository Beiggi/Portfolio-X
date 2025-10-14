import{r as s,j as H}from"./vendor_react-CMaE3ZpS.js";import{R as I,T as N,P as G,C as E,M as k}from"./vendor_ogl--UM621jO.js";import"./vendor-BcYNMOFi.js";const V=`
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`,K=`
  precision highp float;

  uniform float uTime;
  uniform vec3 uResolution;
  uniform vec2 uFocal;
  uniform vec2 uRotation;
  uniform float uStarSpeed;
  uniform float uDensity;
  uniform float uHueShift;
  uniform float uSpeed;
  uniform vec2 uMouse;
  uniform float uGlowIntensity;
  uniform float uSaturation;
  uniform bool uMouseRepulsion;
  uniform float uTwinkleIntensity;
  uniform float uRotationSpeed;
  uniform float uRepulsionStrength;
  uniform float uMouseActiveFactor;
  uniform float uAutoCenterRepulsion;
  uniform bool uTransparent;

  varying vec2 vUv;

  #define NUM_LAYER 4.0
  #define STAR_COLOR_CUTOFF 0.2
  #define MAT45 mat2(0.7071, -0.7071, 0.7071, 0.7071)
  #define PERIOD 3.0

  float Hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float tri(float x) {
    return abs(fract(x) * 2.0 - 1.0);
  }

  float tris(float x) {
    float t = fract(x);
    return 1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0));
  }

  float trisn(float x) {
    float t = fract(x);
    return 2.0 * (1.0 - smoothstep(0.0, 1.0, abs(2.0 * t - 1.0))) - 1.0;
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  float Star(vec2 uv, float flare) {
    float d = length(uv);
    float m = (0.05 * uGlowIntensity) / d;
    float rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare * uGlowIntensity;
    uv *= MAT45;
    rays = smoothstep(0.0, 1.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * 0.3 * flare * uGlowIntensity;
    m *= smoothstep(1.0, 0.2, d);
    return m;
  }

  vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 offset = vec2(float(x), float(y));
        vec2 si = id + offset;
        float seed = Hash21(si);
        float size = fract(seed * 345.32);
        float glossLocal = tri(uStarSpeed / (PERIOD * seed + 1.0));
        float flareSize = smoothstep(0.9, 1.0, size) * glossLocal;

        float red = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 1.0)) + STAR_COLOR_CUTOFF;
        float blu = smoothstep(STAR_COLOR_CUTOFF, 1.0, Hash21(si + 3.0)) + STAR_COLOR_CUTOFF;
        float grn = min(red, blu) * seed;
        vec3 base = vec3(red, grn, blu);

        float hue = atan(base.g - base.r, base.b - base.r) / (2.0 * 3.14159) + 0.5;
        hue = fract(hue + uHueShift / 360.0);
        float sat = length(base - vec3(dot(base, vec3(0.299, 0.587, 0.114)))) * uSaturation;
        float val = max(max(base.r, base.g), base.b);
        base = hsv2rgb(vec3(hue, sat, val));

        vec2 pad = vec2(tris(seed * 34.0 + uTime * uSpeed / 10.0), tris(seed * 38.0 + uTime * uSpeed / 30.0)) - 0.5;
        float star = Star(gv - offset - pad, flareSize);
        vec3 color = base;
        float twinkle = trisn(uTime * uSpeed + seed * 6.2831) * 0.5 + 1.0;
        twinkle = mix(1.0, twinkle, uTwinkleIntensity);
        star *= twinkle;
        col += star * size * color;
      }
    }
    return col;
  }

  void main() {
    vec2 focalPx = uFocal * uResolution.xy;
    vec2 uv = (vUv * uResolution.xy - focalPx) / uResolution.y;
    vec2 mouseNorm = uMouse - vec2(0.5);

    if (uAutoCenterRepulsion > 0.0) {
      vec2 centerUV = vec2(0.0, 0.0);
      float centerDist = length(uv - centerUV);
      vec2 repulsion = normalize(uv - centerUV) * (uAutoCenterRepulsion / (centerDist + 0.1));
      uv += repulsion * 0.05;
    } else if (uMouseRepulsion) {
      vec2 mousePosUV = (uMouse * uResolution.xy - focalPx) / uResolution.y;
      float mouseDist = length(uv - mousePosUV);
      vec2 repulsion = normalize(uv - mousePosUV) * (uRepulsionStrength / (mouseDist + 0.1));
      uv += repulsion * 0.05 * uMouseActiveFactor;
    } else {
      vec2 mouseOffset = mouseNorm * 0.1 * uMouseActiveFactor;
      uv += mouseOffset;
    }

    float autoRotAngle = uTime * uRotationSpeed;
    mat2 autoRot = mat2(cos(autoRotAngle), -sin(autoRotAngle), sin(autoRotAngle), cos(autoRotAngle));
    uv = autoRot * uv;
    uv = mat2(uRotation.x, -uRotation.y, uRotation.y, uRotation.x) * uv;
    vec3 col = vec3(0.0);

    for (float i = 0.0; i < 1.0; i += 1.0 / NUM_LAYER) {
      float depth = fract(i + uStarSpeed * uSpeed);
      float scale = mix(20.0 * uDensity, 0.5 * uDensity, depth);
      float fade = depth * smoothstep(1.0, 0.9, depth);
      col += StarLayer(uv * scale + i * 453.32) * fade;
    }

    if (uTransparent) {
      float alpha = length(col);
      alpha = smoothstep(0.0, 0.3, alpha);
      alpha = min(alpha, 1.0);
      gl_FragColor = vec4(col, alpha);
    } else {
      gl_FragColor = vec4(col, 1.0);
    }
  }
`;function q({focal:R=[.5,.5],rotation:x=[1,0],starSpeed:i=.5,density:y=1,hueShift:g=140,disableAnimation:S=!1,speed:A=1,mouseInteraction:c=!0,glowIntensity:w=.3,saturation:b=0,mouseRepulsion:F=!0,repulsionStrength:M=2,twinkleIntensity:T=.3,rotationSpeed:C=.1,autoCenterRepulsion:L=0,transparent:l=!0,...P}){const n=s.useRef(null),v=s.useRef({x:.5,y:.5}),a=s.useRef({x:.5,y:.5}),f=s.useRef(0),m=s.useRef(0);return s.useEffect(()=>{if(!n.current)return;const t=n.current,p=new I({alpha:l,premultipliedAlpha:!1}),e=p.gl;e.canvas.style.position="absolute",e.canvas.style.top="0",e.canvas.style.left="0",e.canvas.style.width="100%",e.canvas.style.height="100%",t.appendChild(e.canvas),l?(e.enable(e.BLEND),e.blendFunc(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA),e.clearColor(0,0,0,0)):e.clearColor(0,0,0,1);let o;const h=()=>{p.setSize(t.offsetWidth,t.offsetHeight),o&&(o.uniforms.uResolution.value=new E(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height))},z=new N(e);o=new G(e,{vertex:V,fragment:K,uniforms:{uTime:{value:0},uResolution:{value:new E(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height)},uFocal:{value:new Float32Array(R)},uRotation:{value:new Float32Array(x)},uStarSpeed:{value:i},uDensity:{value:y},uHueShift:{value:g},uSpeed:{value:A},uMouse:{value:new Float32Array([a.current.x,a.current.y])},uGlowIntensity:{value:w},uSaturation:{value:b},uMouseRepulsion:{value:F},uTwinkleIntensity:{value:T},uRotationSpeed:{value:C},uRepulsionStrength:{value:M},uMouseActiveFactor:{value:0},uAutoCenterRepulsion:{value:L},uTransparent:{value:l}}}),h();const D=new k(e,{geometry:z,program:o});let d;function _(r){d=requestAnimationFrame(_),S||(o.uniforms.uTime.value=r*.001,o.uniforms.uStarSpeed.value=r*.001*i/10);const u=.05;a.current.x+=(v.current.x-a.current.x)*u,a.current.y+=(v.current.y-a.current.y)*u,m.current+=(f.current-m.current)*u,o.uniforms.uMouse.value[0]=a.current.x,o.uniforms.uMouse.value[1]=a.current.y,o.uniforms.uMouseActiveFactor.value=m.current,p.render({scene:D})}d=requestAnimationFrame(_);const O=r=>{if(!n.current)return;const u=n.current.getBoundingClientRect();v.current={x:(r.clientX-u.left)/u.width,y:1-(r.clientY-u.top)/u.height},f.current=1},U=()=>{f.current=0};return c&&(t.addEventListener("mousemove",O),t.addEventListener("mouseleave",U)),window.addEventListener("resize",h,!1),()=>{cancelAnimationFrame(d),window.removeEventListener("resize",h),c&&(t.removeEventListener("mousemove",O),t.removeEventListener("mouseleave",U)),t&&t.contains(e.canvas)&&t.removeChild(e.canvas),e.getExtension("WEBGL_lose_context")?.loseContext()}},[R,x,i,y,g,S,A,c,w,b,F,T,C,M,L,l]),H.jsx("div",{ref:n,className:"relative h-full w-full",...P})}export{q as default};
