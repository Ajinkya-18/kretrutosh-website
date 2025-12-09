                  <Award className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-semibold">{getText('hero.badge_1', 'CCXP CERTIFIED')}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-lg backdrop-blur-sm border border-accent/20 transition-all hover:bg-accent/20">
                  <Briefcase className="h-5 w-5 text-accent" />
                  <span className="text-foreground font-semibold">{getText('hero.badge_2', 'IIMB Customer Experience Professional')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none mb-12">
                <h2 className="text-3xl font-bold mb-6">{getText('main.headline', '20+ Years of Global Consulting...')}</h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <Card className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: '0.1s' }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        {getText('stats.stat_1_label', 'Revenue Impact')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{getText('stats.stat_1_val', '$80m+')}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: '0.2s' }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <TrendingUp className="h-6 w-6" />
                        {getText('stats.stat_2_label', 'Sales Velocity')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{getText('stats.stat_2_val', '2-5x')}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-border/50 animate-fade-in hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: '0.3s' }}>
                    <CardHeader>
                      <CardTitle className="text-accent flex items-center gap-2">
                        <Award className="h-6 w-6" />
                        {getText('stats.stat_3_label', 'Experience')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-2xl font-bold">{getText('stats.stat_3_val', '360°')}</p>
                    </CardContent>
                  </Card>
                </div>

                <h3 className="text-2xl font-bold mb-4">{getText('expertise.title', 'Unique Expertise')}</h3>
                <ul className="space-y-3 mb-8">
                  <li>✓ {getText('expertise.point_1', 'Unique 360-degree leadership...')}</li>
                  <li>✓ {getText('expertise.point_2', 'Proprietary frameworks...')}</li>
                  <li>✓ {getText('expertise.point_3', 'Proven track record...')}</li>
                </ul>

                <h3 className="text-2xl font-bold mb-4">{getText('brands.title', 'Key Brands Transformed')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  {/* Note: Brands list is usually data, keeping as array for now, but title is dynamic */}
                  {["Alida", "AsBPI", "Suyati", "SYMEGA", "Beyond Truth in Action", "A Milestone Company", "Circles.Life", "AccelerateNext", "C Customer", "InLife", "DiClicks", "KraftHeinz", "Value Retail", "Altudo", "Insular Life", "Pharmacy"].map((brand) => (
                    <div key={brand} className="p-3 bg-muted rounded-lg text-sm font-medium">
                      {brand}
                    </div>
                  ))}
                </div>
              </div>

              {/* Book Section */}
              <div className="mt-16 p-8 bg-gradient-to-br from-accent/10 to-primary/5 rounded-lg border border-accent/20">
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-6 w-6 text-accent" />
                  <h3 className="text-2xl font-bold">{getText('book.title', 'Published Book')}</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  <div className="md:col-span-1 flex justify-center">
                    <img 
                      src={bookCover} 
                      alt="Book Cover" 
                      className="rounded-lg shadow-xl w-full max-w-xs hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => navigate("/book")}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-4">
                    <h4 className="text-2xl font-bold">{getText('book.book_title', 'Beyond Customer Satisfaction')}</h4>
                    <p className="text-xl italic text-muted-foreground">
                      {getText('book.book_sub', 'Crafting Exceptional Customer Experiences...')}
                    </p>
                    <p className="text-lg">
                      {getText('book.desc', 'Explore innovative frameworks...')}
                    </p>
                    <div className="inline-block px-4 py-2 bg-accent/20 rounded-lg border border-accent/30 mb-4">
                      <p className="text-xl font-bold text-accent">{getText('book.badge', 'Now FREE on Amazon')}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                        onClick={() => navigate("/book")}
                      >
                        {getText('book.cta_learn', 'Learn More')}
                        <BookOpen className="ml-2 h-5 w-5" />
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        asChild
                      >
                        <a 
                          href="https://www.amazon.in/dp/B0D17W5B1B" 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {getText('book.cta_download', 'Download from Amazon')}
                          <ExternalLink className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;