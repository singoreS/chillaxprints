import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Heart, Users, Zap, Leaf, Globe, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-chill.jpg";
import lifestyle1 from "@/assets/lifestyle-1.jpg";
import lifestyle2 from "@/assets/lifestyle-2.jpg";

const MotionDiv = motion.div;

const About = () => {
  const values = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Créativité",
      description: "Des designs uniques qui reflètent votre personnalité décontractée",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Authenticité",
      description: "Fidèles à notre philosophie : être soi-même, sans prise de tête",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Communauté",
      description: "Une famille qui célèbre ensemble l'art de la détente",
      gradient: "from-violet-500 to-purple-500",
    },
  ];

  const processSteps = [
    { icon: <Zap className="h-5 w-5" />, title: "Commandez", desc: "Choisissez vos designs préférés" },
    { icon: <Sparkles className="h-5 w-5" />, title: "Production", desc: "Imprimé à la demande pour vous" },
    { icon: <Heart className="h-5 w-5" />, title: "Qualité", desc: "Vérifié avant expédition" },
    { icon: <Globe className="h-5 w-5" />, title: "Livraison", desc: "Chez vous, partout dans le monde" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="À Propos - Notre Histoire et Nos Valeurs"
        description="Découvrez l'histoire de ChillaxPrints, la marque qui célèbre le confort, l'humour et l'authenticité. Nos valeurs : créativité, qualité premium et communauté chill."
        keywords="à propos ChillaxPrints, histoire marque vêtements, valeurs entreprise, mode confortable, philosophie lazy lifestyle"
        canonicalUrl="/a-propos"
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Bold & Immersive */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background with parallax effect */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/20" />
            <div className="absolute top-20 right-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>
          
          <div className="container relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <MotionDiv 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">Lazy but Legendary</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  L'art de ne rien faire,
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
                    avec style.
                  </span>
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                  ChillaxPrints célèbre ceux qui préfèrent un bon canapé à une salle de sport. 
                  Des vêtements pour les esprits drôles et paresseux.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <Button asChild size="lg" className="group">
                    <Link to="/boutique">
                      Découvrir la collection
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </MotionDiv>
              
              <MotionDiv
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative aspect-square max-w-lg mx-auto">
                  {/* Decorative elements */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-accent/20 to-transparent rounded-3xl blur-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl rotate-6" />
                  <img 
                    src={heroImage}
                    alt="ChillaxPrints lifestyle"
                    className="relative rounded-3xl shadow-2xl object-cover w-full h-full"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-2xl shadow-xl border">
                    <p className="text-3xl font-bold text-primary">100%</p>
                    <p className="text-sm text-muted-foreground">Chill Vibes</p>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Founder Section - Personal Story */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-background to-muted/30" />
          
          <div className="container relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Image side with fun decorations */}
              <MotionDiv
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative max-w-md mx-auto">
                  {/* Decorative background */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-3xl blur-2xl" />
                  
                  {/* Main image placeholder - stylized */}
                  <div className="relative aspect-[3/4] rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-dashed border-primary/30 flex items-center justify-center overflow-hidden">
                    <div className="text-center p-8 space-y-4">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center">
                        <span className="text-5xl">👩‍🎨</span>
                      </div>
                      <p className="text-muted-foreground italic">La fondatrice en mode chill</p>
                    </div>
                  </div>
                  
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-card p-3 rounded-2xl shadow-xl border rotate-6">
                    <span className="text-2xl">😴</span>
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-2xl shadow-xl border -rotate-3">
                    <p className="text-sm font-bold text-primary">Pro de la sieste</p>
                  </div>
                  <div className="absolute top-1/2 -right-6 bg-primary text-primary-foreground p-3 rounded-2xl shadow-xl rotate-12">
                    <span className="text-lg">☕</span>
                  </div>
                </div>
              </MotionDiv>
              
              {/* Story side */}
              <MotionDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <span className="text-primary font-semibold tracking-wider uppercase text-sm">Qui suis-je ?</span>
                  <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                    La fille derrière
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent"> ChillaxPrints</span>
                  </h2>
                </div>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    Salut ! Moi c'est la fondatrice de ChillaxPrints, une jeune femme qui a 
                    élevé l'art de <span className="font-semibold text-foreground">ne rien faire</span> au 
                    rang de philosophie de vie. 🛋️
                  </p>
                  <p>
                    Ma vision ? <span className="italic">Pourquoi courir quand on peut marcher ? 
                    Pourquoi marcher quand on peut s'asseoir ? Et pourquoi s'asseoir quand 
                    on peut s'allonger ?</span> C'est ça, l'esprit Chillax.
                  </p>
                  <p>
                    J'ai toujours adoré l'humour, le sarcasme et les phrases qui font 
                    sourire (ou grincer des dents, c'est selon). Un jour, j'ai réalisé que 
                    je n'étais pas la seule à préférer Netflix à la salle de sport, le 
                    canapé aux randonnées, et les siestes aux réunions.
                  </p>
                  <p className="font-medium text-foreground">
                    ChillaxPrints est né de cette révélation : il fallait une marque pour 
                    nous, les paresseux assumés, les amateurs d'humour, les champions 
                    du "je verrai demain". 😎
                  </p>
                </div>
                
                {/* Fun facts */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-card border">
                    <span className="text-2xl mb-2 block">☕</span>
                    <p className="text-sm font-medium">Carburant préféré</p>
                    <p className="text-xs text-muted-foreground">Café + playlist chill</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border">
                    <span className="text-2xl mb-2 block">🎯</span>
                    <p className="text-sm font-medium">Super pouvoir</p>
                    <p className="text-xs text-muted-foreground">Procrastiner avec style</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border">
                    <span className="text-2xl mb-2 block">❤️</span>
                    <p className="text-sm font-medium">Passion secrète</p>
                    <p className="text-xs text-muted-foreground">Créer des designs drôles</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-card border">
                    <span className="text-2xl mb-2 block">🏆</span>
                    <p className="text-sm font-medium">Record personnel</p>
                    <p className="text-xs text-muted-foreground">8 épisodes d'affilée</p>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Story Section - Brand Origin */}
        <section className="py-32 relative overflow-hidden bg-muted/20">
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <span className="text-primary font-semibold tracking-wider uppercase text-sm">L'histoire</span>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                  Comment tout a commencé
                </h2>
                
                <div className="space-y-6 text-lg text-muted-foreground leading-relaxed text-left md:text-center">
                  <p>
                    Un soir, affalée sur mon canapé avec mon hoodie préféré, je scrollais 
                    sans but sur internet (comme d'hab). Et là, révélation : <span className="font-semibold text-foreground">
                    pourquoi est-ce qu'il n'existe pas de marque qui célèbre vraiment 
                    les gens comme moi ?</span>
                  </p>
                  <p>
                    Pas les sportifs du dimanche. Pas les lève-tôt motivés. Non, les vrais : 
                    ceux qui snooze 5 fois leur réveil, qui considèrent que "sortir" c'est 
                    aller jusqu'à la boîte aux lettres, et qui ont une relation passionnelle 
                    avec leur plaid.
                  </p>
                  <p className="font-medium text-foreground text-xl">
                    Alors j'ai créé ChillaxPrints. Pour nous. Pour vous. 
                    Pour tous les lazy legends de ce monde. 🌟
                  </p>
                </div>
              </MotionDiv>
              
              {/* Timeline */}
              <MotionDiv
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-16 grid md:grid-cols-3 gap-8"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="font-bold text-lg mb-2">L'idée 💡</h3>
                  <p className="text-sm text-muted-foreground">Sur mon canapé, un soir de flemme légendaire</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="font-bold text-lg mb-2">La création 🎨</h3>
                  <p className="text-sm text-muted-foreground">Des designs qui parlent à tous les lazy legends</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mx-auto flex items-center justify-center text-primary-foreground font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="font-bold text-lg mb-2">Aujourd'hui 🚀</h3>
                  <p className="text-sm text-muted-foreground">Une communauté de paresseux assumés et fiers !</p>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Values Section - Modern Cards */}
        <section className="py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Ce qui nous anime</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Nos Valeurs</h2>
            </MotionDiv>
            
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="relative h-full p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
                    {/* Gradient glow on hover */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} text-white mb-6 shadow-lg`}>
                      {value.icon}
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Statement - Full Width */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-90" />
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
          
          <div className="container relative z-10 text-center text-primary-foreground">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold leading-tight">
                Notre Mission
              </h2>
              <p className="text-2xl md:text-3xl font-light opacity-95">
                "Aider les gens à célébrer leur côté chill, un vêtement à la fois."
              </p>
              <p className="text-lg opacity-80 max-w-2xl mx-auto">
                Tout le monde mérite de se sentir bien dans ses baskets 
                (même si ces baskets ne servent qu'à aller du canapé au frigo).
              </p>
            </MotionDiv>
          </div>
        </section>

        {/* How It Works - Timeline Style */}
        <section className="py-32 bg-muted/30">
          <div className="container">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-primary font-semibold tracking-wider uppercase text-sm">Print on Demand</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-4">Comment ça marche ?</h2>
              <p className="text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
                Créé pour vous, imprimé à la demande
              </p>
            </MotionDiv>
            
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              {processSteps.map((step, index) => (
                <MotionDiv
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="text-center p-8 rounded-2xl bg-card border hover:border-primary/30 hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 relative">
                      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                        {index + 1}
                      </span>
                      {step.icon}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </MotionDiv>
              ))}
            </div>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center flex-shrink-0">
                  <Leaf className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Éco-responsable</h4>
                  <p className="text-sm text-muted-foreground">Pas de surproduction, chaque article est fabriqué à la demande</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Designs uniques</h4>
                  <p className="text-sm text-muted-foreground">Nos créations exclusives, impossibles à trouver ailleurs</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <Globe className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Production locale</h4>
                  <p className="text-sm text-muted-foreground">Imprimé au plus proche de chez vous</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="container">
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-muted p-12 md:p-20 text-center border"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  Prêt à rejoindre le mouvement ?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Découvrez notre collection et trouvez votre style chill.
                </p>
                <Button asChild size="lg" className="group">
                  <Link to="/boutique">
                    Voir la boutique
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </MotionDiv>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
