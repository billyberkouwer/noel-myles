import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { BufferGeometry, Color, DoubleSide, Float32BufferAttribute, PlaneGeometry, ShaderMaterial } from "three";

export const vert = `
varying vec2 vUv;
uniform float u_time;

float hash( vec2 p ) {
    float h = dot(p,vec2(127.1,311.7));	
      return fract(sin(h)*43758.5453123);
  }

  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
}

void main () {
    float noiseVal = noise(position * 10. + u_time);
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x, position.y, position.z + noiseVal / 100., 1.0);
}
`;

export const frag = `
// An incoming value from JavaScript
uniform float u_time;
// An incoming value from the vertex shader
varying vec2 vUv;
// Let's define PI constant
#define PI 3.14

void main () {
  
  gl_FragColor = vec4(vec3(length(vUv) / 0.5), 1.0);
}
`;

export default function Lake() {

    const [geometry, setGeometry] = useState<BufferGeometry>();
    const [material, setMaterial] = useState<ShaderMaterial>();

    useFrame((state, delta) => {
        const { clock } = state;
        if (material) {
            material.uniforms.u_time.value = clock.elapsedTime;
        }
    })

    useEffect(() => {
        var geometry = new PlaneGeometry(1,1,100,100);
        
        const material = new ShaderMaterial({
            uniforms: {
                color: { value: new Color('#b7e2d7') },
                u_time: { value: 0 },
                size: { value: 1 },
                alpha: { value: 0.3 }
            },
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true,
            side: DoubleSide
        })
        // function updateStarsVertices(radius: number, amount: number) {
        //     radius = radius;
        //     amount = amount;

        //     const diameter = radius * 2;
        //     const vertices = [];
        //     for (let i = 0; i < amount; i++) {
        //         const x = (Math.random() * diameter) - radius;
        //         const y = (Math.random() * diameter) - radius;
        //         const z = (Math.random() * diameter) - radius;
        //         vertices.push(x, y, z);
        //     }
        //     geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        // }
        material.uniformsNeedUpdate = true;
        // updateStarsVertices(100, 5000);
        setGeometry(geometry);
        setMaterial(material)
    }, [])

    return (
        <mesh geometry={geometry} material={material} rotation={[-Math.PI/2, 0, 0]} />    )
}