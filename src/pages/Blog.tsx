import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, Tag, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import StructuredData from "@/components/StructuredData";
import { blogArticles, getAllCategories, BlogArticle } from "@/data/blogArticles";

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Blog - Conseils Mode Streetwear et Tendances"
        description="Découvrez nos articles sur le streetwear, les tendances mode 2025, les conseils pour choisir vos hoodies, t-shirts et accessoires. Le blog ChillaxPrints pour les amateurs de style décontracté."
        keywords="blog mode, streetwear, tendances 2025, hoodie, t-shirt graphique, conseils mode, style lazy, ChillaxPrints"
        canonicalUrl="/blog"
      />
      <StructuredData type="WebSite" />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
              <Badge className="px-4 py-2">📝 Blog ChillaxPrints</Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                Le Blog du{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Lazy Lifestyle
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Conseils mode, tendances streetwear et guides d'achat pour les amateurs de style décontracté
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher un article..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  Tous
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        {!searchQuery && !selectedCategory && (
          <section className="py-12 md:py-16">
            <div className="container px-4 md:px-6">
              <h2 className="text-2xl font-bold mb-8">Article à la Une</h2>
              <Link to={`/blog/${featuredArticle.slug}`}>
                <Card className="group overflow-hidden border-2 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-0">
                    <div className="relative aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={featuredArticle.image}
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center">
                      <Badge className="w-fit mb-4">{featuredArticle.category}</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                        {featuredArticle.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">{featuredArticle.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(featuredArticle.publishedAt)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {featuredArticle.readTime} min de lecture
                        </span>
                      </div>
                      <Button className="w-fit">
                        Lire l'article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
          </section>
        )}

        {/* Articles Grid */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">
              {selectedCategory ? `Articles : ${selectedCategory}` : searchQuery ? "Résultats de recherche" : "Tous les Articles"}
            </h2>
            
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Aucun article trouvé.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory(null);
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 md:py-20 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Restez Informé des Dernières Tendances
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Inscrivez-vous à notre newsletter pour recevoir nos nouveaux articles, conseils mode et offres exclusives.
            </p>
            <Button asChild size="lg">
              <Link to="/boutique">
                Découvrir la Boutique <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
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

const ArticleCard = ({ article, index }: ArticleCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Link 
      to={`/blog/${article.slug}`}
      className="group animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Card className="h-full overflow-hidden border-2 hover:border-primary hover:shadow-[var(--shadow-elegant)] transition-all duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge className="absolute top-3 left-3">{article.category}</Badge>
        </div>
        <CardHeader className="pb-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground pt-0">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {article.readTime} min
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default Blog;
