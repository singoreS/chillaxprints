import { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, Float, SpotLight, useProgress, Center, PresentationControls } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Box, Loader2, RotateCcw, Play, Pause, ZoomIn, ZoomOut, Maximize2, X, Move3D } from "lucide-react";
import * as THREE from "three";

interface Product3DViewerProps {
  modelUrl?: string;
  fallbackImage?: string;
  productTitle?: string;
}

function Model({ url, isRotating }: { url: string; isRotating: boolean }) {
  const { scene } = useGLTF(url);
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state, delta) => {
    if (ref.current && isRotating) {
      ref.current.rotation.y += delta * 0.3;
    }
  });
  
  return (
    <group ref={ref}>
      <primitive object={scene} scale={1.5} />
    </group>
  );
}

function LoadingSpinner() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/10">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/10 rounded-full" />
          <div 
            className="absolute inset-0 w-16 h-16 border-4 border-t-primary border-r-primary/50 border-b-transparent border-l-transparent rounded-full animate-spin" 
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
            {Math.round(progress)}%
          </span>
        </div>
        <span className="text-sm text-white/80 font-medium">Chargement du modèle 3D...</span>
      </div>
    </Html>
  );
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <SpotLight
        position={[5, 5, 5]}
        angle={0.5}
        penumbra={1}
        intensity={2}
        castShadow
        color="#fff8f0"
      />
      <SpotLight
        position={[-5, 5, -5]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#f0f8ff"
      />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#ff6b35" />
    </>
  );
}

export function Product3DViewer({ modelUrl, fallbackImage, productTitle }: Product3DViewerProps) {
  const [show3D, setShow3D] = useState(false);
  const [error, setError] = useState(false);
  const [isRotating, setIsRotating] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // If no 3D model URL provided, show placeholder
  if (!modelUrl) {
    return (
      <div className="aspect-square rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-4 p-6 relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Glowing orb effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl">
            <Move3D className="h-12 w-12 text-white/60" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-base font-semibold text-white">Vue 3D Interactive</p>
            <p className="text-xs text-white/50 max-w-[200px]">
              Le modèle 3D sera bientôt disponible pour ce produit
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-square rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-800 flex flex-col items-center justify-center gap-4 p-6">
        <div className="p-4 rounded-full bg-destructive/20">
          <X className="h-8 w-8 text-destructive" />
        </div>
        <p className="text-sm text-white/70">Erreur de chargement du modèle 3D</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setError(false)}
          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Réessayer
        </Button>
      </div>
    );
  }

  if (!show3D) {
    return (
      <div 
        className="aspect-square rounded-xl bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex flex-col items-center justify-center gap-5 p-6 relative overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,107,53,0.2)]" 
        onClick={() => setShow3D(true)}
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.15),transparent_70%)] animate-pulse" />
        
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        {/* Floating 3D icon with glow */}
        <div className="relative z-10">
          <div className="absolute inset-0 bg-primary/40 rounded-2xl blur-xl scale-150 group-hover:scale-200 transition-transform duration-500" />
          <div className="relative p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 shadow-2xl group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
            <Move3D className="h-12 w-12 text-white group-hover:text-primary transition-colors duration-300" />
          </div>
        </div>
        
        <div className="text-center space-y-2 relative z-10">
          <p className="text-lg font-bold text-white tracking-wide">Vue 3D Interactive</p>
          <p className="text-xs text-white/50">
            Cliquez pour explorer en 3D
          </p>
        </div>
        
        <Button 
          variant="default" 
          size="sm" 
          className="relative z-10 bg-primary/90 hover:bg-primary text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
        >
          <Play className="mr-2 h-4 w-4" />
          Lancer l'expérience 3D
        </Button>
        
        {/* Corner accents */}
        <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-white/20 rounded-tl-lg" />
        <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-white/20 rounded-tr-lg" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-white/20 rounded-bl-lg" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-white/20 rounded-br-lg" />
      </div>
    );
  }

  const ViewerContent = ({ isFullscreenMode = false }: { isFullscreenMode?: boolean }) => (
    <div className={`${isFullscreenMode ? 'fixed inset-0 z-50' : 'aspect-square rounded-xl'} bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 overflow-hidden relative`}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Controls overlay - Top */}
      <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white shadow-lg"
            onClick={() => {
              setShow3D(false);
              setIsFullscreen(false);
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className={`h-9 w-9 backdrop-blur-md border shadow-lg transition-all ${
              isRotating 
                ? 'bg-primary/80 border-primary/50 text-white hover:bg-primary' 
                : 'bg-black/60 border-white/10 text-white hover:bg-white/20'
            }`}
            onClick={() => setIsRotating(!isRotating)}
          >
            {isRotating ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          {!isFullscreenMode && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white shadow-lg"
              onClick={() => setIsFullscreen(true)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          )}
          {isFullscreenMode && (
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:text-white shadow-lg"
              onClick={() => setIsFullscreen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Product title */}
      {productTitle && (
        <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10">
          <div className="px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
            <p className="text-xs font-medium text-white/90 truncate max-w-[200px]">{productTitle}</p>
          </div>
        </div>
      )}
      
      {/* Instructions overlay - Bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="flex items-center gap-4 px-5 py-2.5 bg-black/70 backdrop-blur-md rounded-full border border-white/10">
          <div className="flex items-center gap-1.5 text-white/70">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">🖱️</span>
            </div>
            <span className="text-[11px]">Glisser</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/70">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">🔍</span>
            </div>
            <span className="text-[11px]">Molette</span>
          </div>
          <div className="w-px h-4 bg-white/20" />
          <div className="flex items-center gap-1.5 text-white/70">
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
              <span className="text-[10px]">👆</span>
            </div>
            <span className="text-[11px]">Pincer</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onError={() => setError(true)}
        shadows
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <StudioLights />
          
          <PresentationControls
            global
            snap
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
            config={{ mass: 2, tension: 400 }}
          >
            <Float
              speed={1}
              rotationIntensity={0.2}
              floatIntensity={0.3}
            >
              <Center>
                <Model url={modelUrl} isRotating={isRotating} />
              </Center>
            </Float>
          </PresentationControls>
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={8}
            enableDamping
            dampingFactor={0.05}
          />
          
          <ContactShadows
            position={[0, -1.8, 0]}
            opacity={0.6}
            scale={12}
            blur={2.5}
            far={4}
            color="#000"
          />
          
          <Environment preset="studio" />
          
          {/* Fog for depth */}
          <fog attach="fog" args={['#0a0a0a', 5, 15]} />
        </Suspense>
      </Canvas>
      
      {/* Ambient glow effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-primary/10 blur-[60px] pointer-events-none" />
    </div>
  );

  return (
    <>
      <ViewerContent />
      {isFullscreen && <ViewerContent isFullscreenMode />}
    </>
  );
}

// Preload helper for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
