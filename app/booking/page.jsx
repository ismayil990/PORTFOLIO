import { PageWrapper } from "../components/layout/PageWrapper";

export default function Booking() {
  return (
    <PageWrapper>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Book a <span className="text-purple-400">Consultation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Taking the first step is often the hardest. Fill out the form below, and my office will reach out to confirm your appointment details.
          </p>
        </div>

        <div className="glass-panel p-6 md:p-10 rounded-3xl">
         
        </div>
      </div>
    </PageWrapper>
  );
}
