import { useParams, Link, Navigate } from "react-router-dom";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, Share2, Facebook, Twitter, User, Bookmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { getArticleBySlug, getRelatedArticles, BlogArticle } from "@/data/blogArticles";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ReadingProgress } from "@/components/ReadingProgress";

const BlogArticlePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = article ? getRelatedArticles(article.id, 3) : [];

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shareUrl = `https://www.chillaxprints.com/blog/${article.slug}`;
  const shareTitle = encodeURIComponent(article.title);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishedAt,
    "author": {
      "@type": "Organization",
      "name": "ChillaxPrints"
    },
    "publisher": {
      "@type": "Organization",
      "name": "ChillaxPrints",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.chillaxprints.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": shareUrl
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEO
        title={article.title}
        description={article.excerpt}
        keywords={article.tags.join(", ")}
        canonicalUrl={`/blog/${article.slug}`}
        ogImage={article.image}
        ogType="article"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <ReadingProgress />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section - Full Width Image with Overlay */}
        <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          
          {/* Content Over Image */}
          <div className="absolute inset-0 flex items-end">
            <div className="container px-4 md:px-6 pb-12 md:pb-16">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="max-w-4xl"
              >
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-muted-foreground/80 mb-4">
                  <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
                  <ChevronRight className="h-3 w-3" />
                  <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-foreground/80 truncate max-w-[200px]">{article.title}</span>
                </nav>

                <Badge className="mb-4 bg-primary/90 hover:bg-primary text-primary-foreground px-4 py-1 text-sm font-medium">
                  {article.category}
                </Badge>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-foreground drop-shadow-sm">
                  {article.title}
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6 leading-relaxed">
                  {article.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{article.author}</p>
                      <p className="text-xs text-muted-foreground">Équipe ChillaxPrints</p>
                    </div>
                  </div>
                  
                  <Separator orientation="vertical" className="h-8 hidden md:block" />
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      {article.readTime} min
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Floating Share Bar */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-40"
        >
          <div className="bg-card/80 backdrop-blur-md border rounded-full p-2 shadow-lg flex flex-col gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            >
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            >
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Separator className="my-1" />
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-full hover:bg-primary/10 hover:text-primary transition-all"
            >
              <Bookmark className="h-5 w-5" />
            </Button>
          </div>
        </motion.div>

        {/* Article Content */}
        <section className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              {/* Mobile Share Buttons */}
              <div className="flex items-center justify-between gap-4 mb-10 lg:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Partager :</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                      className="h-9 w-9 rounded-full"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-9 w-9 rounded-full"
                    >
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      asChild
                      className="h-9 w-9 rounded-full"
                    >
                      <a
                        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Article Body */}
              <motion.article 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="prose prose-lg dark:prose-invert max-w-none 
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-foreground prose-h2:border-l-4 prose-h2:border-primary prose-h2:pl-4
                  prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-foreground
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:text-muted-foreground prose-ul:my-6
                  prose-li:my-2 prose-li:marker:text-primary
                  prose-a:text-primary prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                  prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-muted/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-foreground/80
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-hr:border-border prose-hr:my-12"
              >
                <ReactMarkdown
                  components={{
                    h2: ({ children }) => (
                      <h2 className="flex items-center gap-3">
                        <span className="w-1 h-8 bg-primary rounded-full" />
                        {children}
                      </h2>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="relative">
                        <span className="absolute -left-2 top-0 text-6xl text-primary/20 font-serif leading-none">"</span>
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </motion.article>

              <Separator className="my-12" />

              {/* Tags */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap items-center gap-3 mb-12"
              >
                <Tag className="h-5 w-5 text-primary" />
                {article.tags.map((tag) => (
                  <Badge 
                    key={tag} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    #{tag}
                  </Badge>
                ))}
              </motion.div>

              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-muted/50 to-muted border-none shadow-lg overflow-hidden">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <User className="h-10 w-10 text-primary" />
                      </div>
                      <div className="text-center sm:text-left">
                        <p className="text-sm text-primary font-medium mb-1">À propos de l'auteur</p>
                        <h4 className="text-xl font-bold mb-2">{article.author}</h4>
                        <p className="text-muted-foreground leading-relaxed">
                          Passionné par le streetwear et le lifestyle décontracté, l'équipe ChillaxPrints 
                          partage ses conseils mode et ses astuces pour un style unique qui vous ressemble.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="mt-12"
              >
                <Card className="relative overflow-hidden border-2 border-primary/20">
                  <div className="absolute inset-0 bg-[var(--gradient-blog)]" />
                  <CardContent className="relative p-8 md:p-12 text-center">
                    <span className="inline-block text-4xl mb-4">🛒</span>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Envie de Passer à l'Action ?
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto text-lg">
                      Découvrez notre collection de vêtements humoristiques et confortables
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button asChild size="lg" className="gap-2">
                        <Link to="/boutique">
                          Voir la Boutique
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="gap-2">
                        <Link to="/blog">
                          <ArrowLeft className="h-4 w-4" />
                          Plus d'Articles
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-16 md:py-20 bg-muted/30">
            <div className="container px-4 md:px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
              >
                <Badge className="mb-4">Continuer la lecture</Badge>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Articles Similaires
                </h2>
              </motion.div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
                {relatedArticles.map((relatedArticle, index) => (
                  <RelatedArticleCard key={relatedArticle.id} article={relatedArticle} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

interface RelatedArticleCardProps {
  article: BlogArticle;
  index: number;
}

const RelatedArticleCard = ({ article, index }: RelatedArticleCardProps) => {
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
      <Link 
        to={`/blog/${article.slug}`}
        className="group block h-full"
      >
        <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-[var(--shadow-dramatic)] transition-all duration-500 group-hover:-translate-y-2">
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-primary/90 hover:bg-primary">
              {article.category}
            </Badge>
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="font-bold text-lg md:text-xl text-foreground line-clamp-2 group-hover:text-primary transition-colors drop-shadow-sm">
                {article.title}
              </h3>
            </div>
          </div>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
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

export default BlogArticlePage;
