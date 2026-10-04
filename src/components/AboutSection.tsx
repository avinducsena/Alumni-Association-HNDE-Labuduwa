import React from 'react';
import { Compass, Cpu, Wrench, Building2, MapPin, Users2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const engineeringDisciplines = [
    {
      title: "Civil Engineering",
      icon: Building2,
      desc: "Structural engineering, surveying, highway design, construction management, and environmental water systems."
    },
    {
      title: "Electrical Engineering",
      icon: Cpu,
      desc: "Power distribution, electronics, industrial automation, control instrumentation, and telecommunications."
    },
    {
      title: "Mechanical Engineering",
      icon: Wrench,
      desc: "Applied thermodynamics, fluid mechanics, workshop machinery, manufacturing engineering, and CAD drafting."
    }
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative bg-[#0c0507]">
      
      {/* Decorative Gold Accent Lines */}
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#dfb15b] block mb-2">
            Origins & Legacy
          </span>
          <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#fcf9f2]">
            About HNDE Labuduwa
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#dfb15b] to-transparent mx-auto mt-4" />
        </div>

        {/* Two-Column Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left Column: Authentic narrative */}
          <div className="lg:col-span-7 space-y-6 text-[#e7dece] leading-relaxed">
            <div className="bg-[#1c0409] border border-[#dfb15b]/25 rounded-2xl p-6 sm:p-8 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#dfb15b] uppercase tracking-wider mb-4">
                <MapPin className="w-4 h-4" />
                <span>Labuduwa, Akmeemana, Galle</span>
              </div>
              
              <p className="text-lg sm:text-xl font-serif-display italic text-[#fce5a3] mb-4">
                "From classrooms, workshops and training grounds to engineering careers across Sri Lanka and beyond, HNDE Labuduwa has connected generations of engineering students."
              </p>

              <p className="text-sm sm:text-base text-[#e7dece]/90 mb-4">
                The Advanced Technological Institute (ATI) Labuduwa operates under the Sri Lanka Institute of Advanced Technological Education (SLIATE). Situated in the historic southern setting of Labuduwa, Akmeemana, Galle, the institute delivers industry-focused Higher National Diploma in Engineering (HNDE) programs recognized for hands-on technical proficiency.
              </p>

              <p className="text-sm sm:text-base text-[#e7dece]/90">
                The HNDE programme bridges academic engineering principles with intensive workshop training, laboratory experimentation, and practical field work.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#140306] border border-white/5 flex items-start gap-4">
              <Users2 className="w-6 h-6 text-[#dfb15b] shrink-0 mt-1" />
              <div>
                <h4 className="font-serif-display text-lg font-semibold text-[#fcf9f2] mb-1">
                  11 Batches Coming Together
                </h4>
                <p className="text-sm text-[#e7dece]/80">
                  Today, 11 HNDE batches come together through the HNDE Labuduwa Alumni Association to reconnect, network and build a stronger professional community.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#dfb15b]/30 shadow-2xl bg-[#1a0408]">
              <img
                src="/src/assets/images/alumni_engineering_lab_1790962145561.jpg"
                alt="HNDE Labuduwa Engineering Workshops"
                className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140306] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <span className="text-[11px] uppercase tracking-widest text-[#dfb15b] font-semibold block">
                  Industry-Oriented Education
                </span>
                <span className="text-sm font-medium text-[#fcf9f2]">
                  Rigorous hands-on technical and workshop training
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Engineering Disciplines Grid */}
        <div className="mt-12">
          <div className="text-center mb-8">
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#fcf9f2]">
              Core Engineering Disciplines
            </h3>
            <p className="text-xs sm:text-sm text-[#dfb15b] mt-1">
              Foundational pillars of the HNDE Labuduwa curriculum
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {engineeringDisciplines.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#1c0409]/80 border border-[#dfb15b]/20 hover:border-[#dfb15b]/50 transition-all hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#350910] border border-[#dfb15b]/30 flex items-center justify-center text-[#dfb15b] mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-display text-lg font-bold text-[#fcf9f2] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#e7dece]/80 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
