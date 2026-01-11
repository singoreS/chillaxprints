import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Search, ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { blogArticles, getAllCategories, BlogArticle } from "@/data/blogArticles";
import { motion } from "framer-motion";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesSearch = 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredArticle = blogArticles[0];
  const latestArticles = blogArticles.slice(1, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title="Blog - Conseils Mode Streetwear et Tendances"
        description="Découvrez nos articles sur le streetwear, les tendances mode 2026, les conseils pour choisir vos hoodies, t-shirts et accessoires. Le blog ChillaxPrints pour les amateurs de style décontracté."
        keywords="blog mode, streetwear, tendances 2026, hoodie, t-shirt graphique, conseils mode, style lazy, ChillaxPrints"
        canonicalUrl="/blog"
      />
      <StructuredData type="WebSite" />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Magazine Style */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[var(--gradient-blog)]" />
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>
          
          <div className="container px-4 md:px-6 relative">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto space-y-6"
            >
              <Badge className="px-6 py-2 text-sm font-medium bg-primary/10 text-primary border-primary/20">
                <Sparkles className="w-4 h-4 mr-2" />
                Le Magazine ChillaxPrints
              </Badge>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Style, Culture &{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Lazy Vibes
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Tendances streetwear, guides d'achat et conseils mode pour les amateurs de confort stylé
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters - Sticky */}
        <section className="sticky top-0 z-30 py-4 bg-background/80 backdrop-blur-lg border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-full border-2 focus:border-primary"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="rounded-full px-5"
                >
                  Tous
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="rounded-full px-5"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article - Full Width Hero Card */}
        {!searchQuery && !selectedCategory && (
          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3 mb-8"
              >
                <TrendingUp className="h-6 w-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold">À la Une</h2>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link to={`/blog/${featuredArticle.slug}`}>
                  <Card className="group overflow-hidden border-0 shadow-[var(--shadow-dramatic)] hover:shadow-2xl transition-all duration-500">
                    <div className="grid lg:grid-cols-2 gap-0">
                      <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                        <img
                          src={featuredArticle.image}
                          alt={featuredArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-background/20" />
                        <Badge className="absolute top-6 left-6 bg-primary text-primary-foreground px-4 py-1.5 text-sm">
                          {featuredArticle.category}
                        </Badge>
                      </div>
                      <CardContent className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            {formatDate(featuredArticle.publishedAt)}
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            {featuredArticle.readTime} min
                          </span>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-primary transition-colors leading-tight">
                          {featuredArticle.title}
                        </h3>
                        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                          {featuredArticle.excerpt}
                        </p>
                        <Button className="w-fit gap-2 group/btn">
                          Lire l'article
                          <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </div>
          </section>
        )}

        {/* Latest Articles - 3 Column Grid */}
        {!searchQuery && !selectedCategory && (
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl md:text-3xl font-bold mb-10"
              >
                Articles Récents
              </motion.h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                {latestArticles.map((article, index) => (
                  <FeaturedCard key={article.id} article={article} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Articles Grid - Magazine Layout */}
        <section className="py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-10"
            >
              {selectedCategory ? `Articles : ${selectedCategory}` : searchQuery ? "Résultats de recherche" : "Explorer Tous les Articles"}
            </motion.h2>
            
            {filteredArticles.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-xl text-muted-foreground mb-4">Aucun article trouvé.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                  className="rounded-full"
                >
                  Réinitialiser les filtres
                </Button>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA - Premium Style */}
        <section className="py-20 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5" />
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl" />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="container px-4 md:px-6 relative text-center"
          >
            <span className="text-6xl mb-6 block">✨</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Prêt à Upgrader Votre Style ?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Découvrez notre collection de vêtements humoristiques et confortables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="gap-2 px-8 text-lg h-14 rounded-full">
                <Link to="/boutique">
                  Découvrir la Boutique
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface ArticleCardProps {
  article: BlogArticle;
  index: number;
}

const FeaturedCard = ({ article, index }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${article.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-[var(--shadow-dramatic)] transition-all duration-500 group-hover:-translate-y-2">
          <div className="relative aspect-[3/2] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
              {article.category}
            </Badge>
          </div>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground" />
              <span>{article.readTime} min</span>
            </div>
            <h3 className="font-bold text-xl mb-3 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2">
              {article.excerpt}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link to={`/blog/${article.slug}`} className="group block h-full">
        <Card className="h-full overflow-hidden border hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Badge className="absolute top-3 left-3 text-xs" variant="secondary">
              {article.category}
            </Badge>
          </div>
          <CardContent className="p-5">
            <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formatDate(article.publishedAt)}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {article.readTime} min
              </span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
};

export default Blog;
