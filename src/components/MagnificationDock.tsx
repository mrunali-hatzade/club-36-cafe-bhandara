import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

export type DockItemData = {
  icon?: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  tooltip?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children?: React.ReactNode;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  magnification?: number;
  spring?: SpringOptions;
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
};

function DockItem({
  children,
  className = '',
  onClick,
  onMouseEnter,
  onMouseLeave,
  mouseX,
  spring,
  distance
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: 80
    };
    return val - rect.x - rect.width / 2;
  });

  const targetScale = useTransform(mouseDistance, [-distance, 0, distance], [1, 1.12, 1]);
  const scale = useSpring(targetScale, spring);

  return (
    <motion.div
      ref={ref}
      style={{
        scale
      }}
      onHoverStart={() => {
        isHovered.set(1);
        if (onMouseEnter) onMouseEnter();
      }}
      onHoverEnd={() => {
        isHovered.set(0);
        if (onMouseLeave) onMouseLeave();
      }}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-xl bg-white/70 border border-coffee/10 dark:bg-neutral-900/70 dark:border-beige/10 shadow-sm cursor-pointer select-none text-charcoal/80 dark:text-cream/80 outline-none transition-colors hover:text-terracotta dark:hover:text-terracotta focus:ring-2 focus:ring-coffee/15 ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number> }>, { isHovered })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockLabel({ children, className = '', isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: -8 }}
          exit={{ opacity: 0, y: 5 }}
          transition={{ duration: 0.15 }}
          className={`${className} absolute bottom-full mb-2 left-1/2 w-fit whitespace-pre rounded-lg border border-coffee/10 dark:border-beige/10 bg-white dark:bg-neutral-800 px-2.5 py-1 text-[10px] font-bold text-coffee dark:text-beige shadow-md backdrop-blur-md z-[200] pointer-events-none`}
          role="tooltip"
          style={{ x: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`flex items-center justify-center ${className}`}>{children}</div>;
}

export function MagnificationDock({
  items,
  className = '',
  spring = { mass: 0.08, stiffness: 180, damping: 14 },
  distance = 150
}: DockProps) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex items-center justify-center">
      <motion.div
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          mouseX.set(Infinity);
        }}
        className={`${className} flex items-center justify-center gap-1.5`}
        role="toolbar"
        aria-label="Navigation dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            onMouseEnter={item.onMouseEnter}
            onMouseLeave={item.onMouseLeave}
            className={item.className}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
          >
            <DockIcon>
              <div className="flex items-center gap-1.5 px-3 py-2 font-display text-[13px] font-semibold">
                {item.icon && <span className="text-coffee/60 dark:text-beige/60">{item.icon}</span>}
                {item.label}
              </div>
            </DockIcon>
            {item.children}
            {item.tooltip && <DockLabel>{item.tooltip}</DockLabel>}
          </DockItem>
        ))}
      </motion.div>
    </div>
  );
}

export default MagnificationDock;
