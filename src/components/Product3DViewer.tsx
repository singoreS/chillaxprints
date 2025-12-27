import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Box, Loader2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

interface Product3DViewerProps {
  modelUrl?: string;
  fallbackImage?: string;
  productTitle?: string;
}

function Model({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="text-sm text-muted-foreground">Chargement du modèle 3D...</span>
      </div>
    </Html>
  );
}

export function Product3DViewer({ modelUrl, fallbackImage, productTitle }: Product3DViewerProps) {
  const [show3D, setShow3D] = useState(false);
  const [error, setError] = useState(false);

  // If no 3D model URL provided, show placeholder
  if (!modelUrl) {
    return (
      <div className="aspect-square rounded-xl border-2 border-dashed border-border/50 bg-secondary/20 flex flex-col items-center justify-center gap-4 p-6">
        <div className="p-4 rounded-full bg-primary/10">
          <Box className="h-12 w-12 text-primary/60" />
        </div>
        <div className="text-center space-y-2">
          <p className="text-sm font-medium text-foreground">Vue 3D non disponible</p>
          <p className="text-xs text-muted-foreground">
            Le modèle 3D de ce produit sera bientôt disponible
          </p>
        </div>
        {fallbackImage && (
          <Button variant="outline" size="sm" className="mt-2" asChild>
            <a href={fallbackImage} target="_blank" rel="noopener noreferrer">
              Voir l'image
            </a>
          </Button>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="aspect-square rounded-xl border-2 border-dashed border-destructive/30 bg-destructive/5 flex flex-col items-center justify-center gap-4 p-6">
        <p className="text-sm text-destructive">Erreur de chargement du modèle 3D</p>
        <Button variant="outline" size="sm" onClick={() => setError(false)}>
          Réessayer
        </Button>
      </div>
    );
  }

  if (!show3D) {
    return (
      <div className="aspect-square rounded-xl border-2 border-border/50 bg-gradient-to-br from-secondary/40 to-secondary/20 flex flex-col items-center justify-center gap-4 p-6 relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300" onClick={() => setShow3D(true)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_70%)]" />
        <div className="p-5 rounded-full bg-primary/20 group-hover:bg-primary/30 group-hover:scale-110 transition-all duration-300 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)]">
          <Box className="h-10 w-10 text-primary" />
        </div>
        <div className="text-center space-y-2 relative">
          <p className="text-base font-semibold text-foreground">Vue 3D disponible</p>
          <p className="text-xs text-muted-foreground">
            Cliquez pour explorer le produit en 3D
          </p>
        </div>
        <Button variant="default" size="sm" className="mt-2 shadow-lg">
          <Box className="mr-2 h-4 w-4" />
          Lancer la vue 3D
        </Button>
      </div>
    );
  }

  return (
    <div className="aspect-square rounded-xl border-2 border-primary/30 bg-gradient-to-br from-background to-secondary/20 overflow-hidden relative shadow-[0_0_40px_rgba(var(--primary-rgb),0.15)]">
      {/* Controls overlay */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="h-8 w-8 bg-background/90 backdrop-blur-sm shadow-md hover:bg-background"
          onClick={() => setShow3D(false)}
        >
          <RotateCcw className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="absolute bottom-3 left-3 right-3 z-10">
        <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center shadow-md">
          <p className="text-xs text-muted-foreground">
            🖱️ Glisser pour tourner • Molette pour zoomer
          </p>
        </div>
      </div>

      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        onError={() => setError(true)}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          
          <Model url={modelUrl} />
          
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={1}
          />
          
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload helper for better performance
export function preloadModel(url: string) {
  useGLTF.preload(url);
}
