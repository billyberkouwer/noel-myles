import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { BufferGeometry, Float32BufferAttribute, ShaderMaterial, Color, } from 'three';

export const vert = `
    varying vec4 mvPosition;
    uniform float time;
    uniform float size;

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

    void main() {
      float time = time / 10.;
      float noiseVal1 = noise(vec3(position.y - time, position.y - time, position.y - time)) * 20.;
      float noiseVal2 = noise(vec3(position.y - time + 2., position.y - time + 2., position.y - time + 2.)) * 20.;
      float noiseVal3 = noise(vec3(position.y - time + 3., position.y - time + 3., position.y - time + 3.)) * 20.;
      mvPosition = modelViewMatrix * vec4( position.x - noiseVal1, position.y - noiseVal2 - (time * 10.), position.z - noiseVal3, 1.0 );
      mvPosition.xyz = mod(mvPosition.xyz, size * 2.0) - size;
      gl_PointSize *= ( 2. / - mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }
`;

export const frag = `
    varying vec4 mvPosition;
    uniform vec3 color;
    uniform float alpha;

    void main() {
        float r = 0.0, delta = 0.0;
        vec2 cxy = 2.0 * gl_PointCoord - 1.0;
        r = dot(cxy, cxy);
        if (r > 1.0) {
            discard;
        }
        gl_FragColor = vec4(color, max(alpha / r / 2., 0.1));
    }
`;

export default function Particles() {
    const [geometry, setGeometry] = useState<BufferGeometry>();
    const [material, setMaterial] = useState<ShaderMaterial>();

    useFrame((state, delta) => {
        const { clock } = state;
        if (material) {
            material.uniforms.time.value = clock.elapsedTime;
        }
    })

    useEffect(() => {
        var geometry = new BufferGeometry();
        const material = new ShaderMaterial({
            uniforms: {
                color: { value: new Color('#b7e2d7') },
                time: { value: 0 },
                size: { value: 1 },
                alpha: { value: 0.3 }
            },
            vertexShader: vert,
            fragmentShader: frag,
            transparent: true
        })
        function updateStarsVertices(radius: number, amount: number) {
            radius = radius;
            amount = amount;

            const diameter = radius * 2;
            const vertices = [];
            for (let i = 0; i < amount; i++) {
                const x = (Math.random() * diameter) - radius;
                const y = (Math.random() * diameter) - radius;
                const z = (Math.random() * diameter) - radius;
                vertices.push(x, y, z);
            }
            geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        }
        material.uniformsNeedUpdate = true;
        updateStarsVertices(100, 5000);
        setGeometry(geometry);
        setMaterial(material)
    }, [])

    return <points geometry={geometry} material={material} scale={1} />
}