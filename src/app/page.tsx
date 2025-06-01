import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 bg-gradient-to-br from-background to-secondary/30">
      <Card className="w-full max-w-2xl shadow-2xl rounded-xl overflow-hidden">
        <CardHeader className="p-0 relative">
          <Image
            src="https://placehold.co/800x400.png"
            alt="Stylish home interior"
            width={800}
            height={400}
            className="w-full h-64 object-cover"
            data-ai-hint="modern living room"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 md:p-8">
            <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary-foreground mb-2">
              DecorStyle Discovery
            </h1>
            <CardDescription className="text-lg text-primary-foreground/90">
              Uncover your unique home decor style and get personalized tips.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 md:p-8">
          <p className="text-lg text-foreground mb-6">
            Ready to transform your space? Our interactive quiz uses AI to analyze your preferences and reveal your true decor personality. Get ready for a home that truly feels like you!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Home className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Personalized Insights</h3>
                <p className="text-sm text-muted-foreground">Tailored recommendations based on your choices.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg">
              <Sparkles className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">AI-Powered Analysis</h3>
                <p className="text-sm text-muted-foreground">Discover your style with cutting-edge technology.</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 md:p-8 bg-muted/30">
          <Link href="/quiz" legacyBehavior passHref>
            <Button size="lg" className="w-full text-lg py-7">
              Start Your Style Discovery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <footer className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} DecorStyle Discovery. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
