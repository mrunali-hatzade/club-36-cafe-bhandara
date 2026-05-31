import Spline from '@splinetool/react-spline';

interface CoffeeModelProps {
  className?: string;
}

export default function CoffeeModel({ className = "w-full h-[400px] md:h-[500px] lg:h-[600px]" }: CoffeeModelProps) {
  return (
    <div className={`${className} flex items-center justify-center relative z-40 pointer-events-auto`}>
      <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
    </div>
  );
}
