import { companyTimeline } from "@/data/company";

export default function Timeline() {
  return (
    <section>
      <h2 className="font-heading text-3xl font-bold text-text-primary mb-8 sm:text-4xl">
        Yolculuğumuz
      </h2>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-cream-300 sm:left-1/2" />
        <div className="space-y-12">
          {companyTimeline.map((item, index) => (
            <div key={item.year} className="relative flex items-start gap-8">
              <div className={`hidden sm:block sm:w-1/2 ${index % 2 === 0 ? "text-right pr-12" : "order-2 pl-12"}`}>
                <div className="font-heading text-2xl font-bold text-terracotta-400">
                  {item.year}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2">{item.description}</p>
              </div>
              <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 h-3 w-3 rounded-full bg-terracotta-400 border-4 border-cream-100 z-10" />
              {/* Mobile view */}
              <div className="sm:hidden pl-10">
                <div className="font-heading text-2xl font-bold text-terracotta-400">
                  {item.year}
                </div>
                <h3 className="font-heading text-lg font-semibold text-text-primary mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-text-secondary mt-2">{item.description}</p>
              </div>
              {index % 2 !== 0 && <div className="hidden sm:block sm:w-1/2" />}
              {index % 2 === 0 && <div className="hidden sm:block sm:w-1/2 order-2" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
