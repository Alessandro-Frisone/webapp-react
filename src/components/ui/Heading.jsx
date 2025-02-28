export default function Heading({ level, children, ...props }) {
    if (level === 1) {
      return (
        <h1 className="text-4xl font-bold text-center" {...props}>
          {children}
        </h1>
      );
    }
  
    if (level === 2) {
      return (
        <h2 className="text-3xl font-semibold text-center" {...props}>
          {children}
        </h2>
      );
    }
  
    if (level === 3) {
      return (
        <h3 className="text-2xl font-medium text-center" {...props}>
          {children}
        </h3>
      );
    }
  
    if (level === 4) {
      return (
        <h4 className="text-xl font-medium" {...props}>
          {children}
        </h4>
      );
    }
  
    if (level === 5) {
      return (
        <h5 className="text-lg" {...props}>
          {children}
        </h5>
      );
    }
  
    if (level === 6) {
      return (
        <h6 className="text-md" {...props}>
          {children}
        </h6>
      );
    }
  }