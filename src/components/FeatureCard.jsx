import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, index = 0 }) => {
  return (
    <div
      role="article"
      tabIndex={0}
      aria-labelledby={`feature-title-${index}`}
      className="glass-card p-6 md:p-8 flex flex-col items-start transition-all duration-300 
                 hover:scale-[1.02] hover:border-cyan-400/50 hover:shadow-xl hover:shadow-cyan-500/10
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400 
                 group cursor-default relative overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Background radial gradient highlight on hover */}
      <div 
        className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all duration-500 pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Icon in colored circle with gradient from cyan to violet */}
      <div
        className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-violet-500 p-0.5 shadow-lg shadow-cyan-500/20 mb-6 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
        aria-hidden="true"
      >
        <div className="w-full h-full bg-midnight-950/40 dark:bg-midnight-950/40 light:bg-white/90 rounded-[14px] flex items-center justify-center text-cyan-300 light:text-cyan-700">
          {Icon && <Icon className="w-7 h-7 stroke-[2]" />}
        </div>
      </div>

      {/* Title */}
      <h3
        id={`feature-title-${index}`}
        className="text-xl font-bold text-white light:text-gray-900 mb-3 tracking-tight group-hover:text-cyan-300 transition-colors duration-200"
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 light:text-gray-600 text-sm md:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
