import { SEO } from "@/components/SEO";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Ruler, Info } from "lucide-react";

const SizeGuide = () => {
  return (
    <>
      <SEO 
        title="Guide des Tailles | ChillaxPrints"
        description="Trouvez votre taille parfaite avec notre guide des tailles détaillé pour t-shirts, hoodies, bonnets et chaussures. Mesures précises pour éviter les erreurs de commande."
        keywords="guide des tailles, mesures vêtements, taille t-shirt, taille hoodie, pointure chaussures, ChillaxPrints"
      />
      <Header />
      
      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <Ruler className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Guide des Tailles
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trouve ta taille parfaite pour être à l'aise dans ton mode chill. 
              Nos produits sont fabriqués par des partenaires Printify avec des standards de qualité élevés.
            </p>
          </div>

          {/* How to Measure */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Comment prendre tes mesures ?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
              <div>
                <h3 className="font-medium text-foreground mb-2">Pour les vêtements</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Tour de poitrine :</strong> Mesure horizontalement à l'endroit le plus large de ta poitrine.</li>
                  <li><strong>Longueur :</strong> Du haut de l'épaule jusqu'au bas du vêtement.</li>
                  <li><strong>Largeur d'épaules :</strong> D'une couture d'épaule à l'autre.</li>
                  <li><strong>Longueur de manche :</strong> De la couture d'épaule jusqu'au poignet.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-2">Pour les chaussures</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>Longueur du pied :</strong> Place ton pied sur une feuille, marque le talon et l'orteil le plus long.</li>
                  <li><strong>Mesure en cm :</strong> Mesure la distance entre les deux marques.</li>
                  <li><strong>Conseil :</strong> Mesure tes pieds en fin de journée quand ils sont légèrement gonflés.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Size Tables */}
          <Tabs defaultValue="tshirts" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="tshirts">T-Shirts</TabsTrigger>
              <TabsTrigger value="hoodies">Hoodies</TabsTrigger>
              <TabsTrigger value="bonnets">Bonnets</TabsTrigger>
              <TabsTrigger value="shoes">Chaussures</TabsTrigger>
            </TabsList>

            {/* T-Shirts */}
            <TabsContent value="tshirts">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">T-Shirts Unisexe</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Coupe classique regular fit. Toutes les mesures sont en centimètres.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Taille</TableHead>
                        <TableHead>Tour de poitrine</TableHead>
                        <TableHead>Longueur</TableHead>
                        <TableHead>Largeur</TableHead>
                        <TableHead>Manche</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">XS</TableCell>
                        <TableCell>86-91</TableCell>
                        <TableCell>66</TableCell>
                        <TableCell>46</TableCell>
                        <TableCell>19</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">S</TableCell>
                        <TableCell>91-96</TableCell>
                        <TableCell>69</TableCell>
                        <TableCell>48</TableCell>
                        <TableCell>20</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">M</TableCell>
                        <TableCell>96-101</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>51</TableCell>
                        <TableCell>21</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">L</TableCell>
                        <TableCell>101-106</TableCell>
                        <TableCell>74</TableCell>
                        <TableCell>54</TableCell>
                        <TableCell>22</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">XL</TableCell>
                        <TableCell>106-111</TableCell>
                        <TableCell>76</TableCell>
                        <TableCell>57</TableCell>
                        <TableCell>23</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2XL</TableCell>
                        <TableCell>111-116</TableCell>
                        <TableCell>78</TableCell>
                        <TableCell>60</TableCell>
                        <TableCell>24</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">3XL</TableCell>
                        <TableCell>116-121</TableCell>
                        <TableCell>80</TableCell>
                        <TableCell>63</TableCell>
                        <TableCell>25</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 bg-muted/30 text-sm text-muted-foreground">
                  💡 <strong>Conseil :</strong> Entre deux tailles ? Prends la taille au-dessus pour un look plus décontracté.
                </div>
              </div>
            </TabsContent>

            {/* Hoodies */}
            <TabsContent value="hoodies">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Hoodies & Pulls</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Coupe oversize confortable. Toutes les mesures sont en centimètres.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Taille</TableHead>
                        <TableHead>Tour de poitrine</TableHead>
                        <TableHead>Longueur</TableHead>
                        <TableHead>Largeur</TableHead>
                        <TableHead>Manche</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">XS</TableCell>
                        <TableCell>96-101</TableCell>
                        <TableCell>64</TableCell>
                        <TableCell>50</TableCell>
                        <TableCell>59</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">S</TableCell>
                        <TableCell>101-106</TableCell>
                        <TableCell>66</TableCell>
                        <TableCell>52</TableCell>
                        <TableCell>60</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">M</TableCell>
                        <TableCell>106-111</TableCell>
                        <TableCell>69</TableCell>
                        <TableCell>55</TableCell>
                        <TableCell>61</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">L</TableCell>
                        <TableCell>111-116</TableCell>
                        <TableCell>72</TableCell>
                        <TableCell>58</TableCell>
                        <TableCell>62</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">XL</TableCell>
                        <TableCell>116-121</TableCell>
                        <TableCell>74</TableCell>
                        <TableCell>61</TableCell>
                        <TableCell>63</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">2XL</TableCell>
                        <TableCell>121-126</TableCell>
                        <TableCell>76</TableCell>
                        <TableCell>64</TableCell>
                        <TableCell>64</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">3XL</TableCell>
                        <TableCell>126-131</TableCell>
                        <TableCell>78</TableCell>
                        <TableCell>67</TableCell>
                        <TableCell>65</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 bg-muted/30 text-sm text-muted-foreground">
                  💡 <strong>Conseil :</strong> Nos hoodies ont une coupe légèrement oversize. Prends ta taille habituelle pour le style chill parfait.
                </div>
              </div>
            </TabsContent>

            {/* Bonnets */}
            <TabsContent value="bonnets">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Bonnets</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Taille unique avec élasticité pour s'adapter à toutes les têtes.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">Taille</TableHead>
                        <TableHead>Tour de tête</TableHead>
                        <TableHead>Hauteur</TableHead>
                        <TableHead>Élasticité</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Taille Unique</TableCell>
                        <TableCell>54-60 cm</TableCell>
                        <TableCell>21-23 cm</TableCell>
                        <TableCell>Extensible +5 cm</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-medium text-foreground">Comment mesurer ton tour de tête ?</h3>
                  <p className="text-muted-foreground text-sm">
                    Place un mètre ruban autour de ta tête, juste au-dessus des sourcils et des oreilles, 
                    à l'endroit le plus large de ton crâne. C'est ta mesure de tour de tête.
                  </p>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <p className="text-sm text-foreground">
                      🎯 <strong>La plupart des adultes</strong> ont un tour de tête entre 54 et 60 cm. 
                      Nos bonnets s'adaptent parfaitement à cette plage grâce à leur matière extensible.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Shoes */}
            <TabsContent value="shoes">
              <div className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Chaussures</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    Correspondance des pointures EU, US et UK avec longueur du pied en cm.
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">EU</TableHead>
                        <TableHead>US Homme</TableHead>
                        <TableHead>US Femme</TableHead>
                        <TableHead>UK</TableHead>
                        <TableHead>Longueur (cm)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">36</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>5.5</TableCell>
                        <TableCell>3.5</TableCell>
                        <TableCell>22.5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">37</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>6.5</TableCell>
                        <TableCell>4</TableCell>
                        <TableCell>23.1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">38</TableCell>
                        <TableCell>5.5</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>5</TableCell>
                        <TableCell>23.8</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">39</TableCell>
                        <TableCell>6.5</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>6</TableCell>
                        <TableCell>24.5</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">40</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>8.5</TableCell>
                        <TableCell>6.5</TableCell>
                        <TableCell>25.1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">41</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell>9.5</TableCell>
                        <TableCell>7</TableCell>
                        <TableCell>25.8</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">42</TableCell>
                        <TableCell>8.5</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>7.5</TableCell>
                        <TableCell>26.4</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">43</TableCell>
                        <TableCell>9.5</TableCell>
                        <TableCell>11</TableCell>
                        <TableCell>8.5</TableCell>
                        <TableCell>27.1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">44</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>11.5</TableCell>
                        <TableCell>9</TableCell>
                        <TableCell>27.8</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">45</TableCell>
                        <TableCell>11</TableCell>
                        <TableCell>12.5</TableCell>
                        <TableCell>10</TableCell>
                        <TableCell>28.4</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">46</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>13.5</TableCell>
                        <TableCell>11</TableCell>
                        <TableCell>29.1</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">47</TableCell>
                        <TableCell>13</TableCell>
                        <TableCell>14.5</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell>29.8</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <div className="p-4 bg-muted/30 text-sm text-muted-foreground">
                  💡 <strong>Conseil :</strong> Si tu hésites entre deux pointures, choisis la plus grande pour plus de confort. 
                  Les chaussures peuvent être légèrement ajustées avec des semelles.
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-3">🏭 Fabrication Printify</h3>
              <p className="text-muted-foreground text-sm">
                Nos produits sont fabriqués à la demande par les partenaires de production Printify. 
                Les tailles peuvent varier légèrement selon le fournisseur, mais restent dans les tolérances indiquées.
              </p>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6">
              <h3 className="font-semibold text-foreground mb-3">❓ Besoin d'aide ?</h3>
              <p className="text-muted-foreground text-sm">
                Tu n'es pas sûr de ta taille ? Contacte-nous via notre{" "}
                <a href="/contact" className="text-primary hover:underline">page de contact</a>{" "}
                et on t'aidera à trouver la taille parfaite pour ton style chill.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SizeGuide;
