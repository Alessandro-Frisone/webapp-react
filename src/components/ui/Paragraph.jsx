export default function Paragraph({ children, size = "md", className }) {
    const sizes = {
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    };
  
    return <p className={`${sizes[size]} ${className}`}>{children}</p>;
}