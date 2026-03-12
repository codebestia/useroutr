"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { 
  CreditCard, 
  Globe, 
  FileText, 
  RefreshCw, 
  Palette,
  CheckCircle2,
  ArrowRightLeft,
  Settings
} from "lucide-react";
import { motion } from "framer-motion";

export function ProductsSection() {
  return (
    <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Core Product <br />
            <span className="text-zinc-600 italic font-light">Modules.</span>
          </h2>
          <p className="text-xl text-zinc-500 font-mono tracking-tight">
            Independent layers of institutional payment infrastructure, unified by one API.
          </p>
        </div>
        
        <BentoGrid className="mx-auto md:auto-rows-[20rem]">
          {products.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              header={item.header}
              className={cn("[&>p:text-lg]", item.span)}
              icon={item.icon}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const SkeletonCheckout = () => {
  const variants = {
    initial: { x: 0 },
    animate: {
      x: 10,
      rotate: 2,
      transition: { duration: 0.2 },
    },
  };
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-24 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 justify-center items-center"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-white/10 p-4 items-center space-x-4 bg-black/50 backdrop-blur-sm"
      >
        <div className="h-10 w-10 rounded-full bg-blue/20 flex items-center justify-center">
          <CreditCard className="text-blue h-6 w-6" />
        </div>
        <div className="space-y-2">
          <div className="h-2 w-24 bg-white/10 rounded-full" />
          <div className="h-2 w-16 bg-white/5 rounded-full" />
        </div>
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="ml-4"
        >
          <CheckCircle2 className="text-green h-6 w-6" />
        </motion.div>
      </motion.div>
      <div className="flex space-x-2">
        <div className="h-8 w-12 rounded bg-white/5" />
        <div className="h-8 w-12 rounded bg-white/5" />
        <div className="h-8 w-12 rounded bg-white/5" />
      </div>
    </motion.div>
  );
};

const SkeletonPayouts = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative items-center justify-center overflow-hidden">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative"
      >
        <Globe className="h-24 w-24 text-teal/20" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5], x: [0, 40, 80], y: [0, -20, -40] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute h-2 w-2 bg-teal rounded-full shadow-[0_0_10px_rgba(45,212,191,0.5)]"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1.5], x: [0, -40, -80], y: [0, 20, 40] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
        className="absolute h-2 w-2 bg-blue rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      />
    </div>
  );
};

const SkeletonInvoicing = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col p-4 space-y-3">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
          className="h-10 rounded-lg border border-white/5 bg-white/2 flex items-center px-4 justify-between"
        >
          <div className="flex items-center space-x-3">
            <div className="h-2 w-12 bg-white/10 rounded-full" />
          </div>
          <motion.div 
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-2 w-16 bg-amber/30 rounded-full" 
          />
        </motion.div>
      ))}
    </div>
  );
};

const SkeletonRamps = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] items-center justify-center p-4">
      <div className="flex items-center space-x-6">
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-blue2/10">
            <span className="text-white font-bold text-lg">$</span>
          </div>
          <span className="text-[10px] text-white/40 uppercase font-mono">Fiat</span>
        </div>
        <motion.div
          animate={{ rotate: 180 }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        >
          <ArrowRightLeft className="text-blue2 h-6 w-6" />
        </motion.div>
        <div className="flex flex-col items-center space-y-2">
          <div className="h-12 w-12 rounded-full border border-white/10 flex items-center justify-center bg-blue/10">
             <div className="h-6 w-6 rounded-full border-2 border-blue border-t-transparent animate-spin" />
          </div>
          <span className="text-[10px] text-white/40 uppercase font-mono">Crypto</span>
        </div>
      </div>
    </div>
  );
};

const SkeletonWhiteLabel = () => {
  return (
    <div className="flex flex-1 w-full h-full min-h-24 dark:bg-dot-white/[0.2] bg-dot-black/[0.2] p-4 flex-col space-y-4">
      <div className="flex items-center space-x-3">
        <Settings className="h-5 w-5 text-purple/40" />
        <div className="h-2 w-24 bg-white/10 rounded-full" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="h-20 rounded-xl bg-purple/10 border border-purple/20 p-3 flex flex-col justify-end"
        >
          <div className="h-1.5 w-12 bg-purple/40 rounded-full" />
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="h-20 rounded-xl bg-pink/10 border border-pink/20 p-3 flex flex-col justify-end"
        >
          <div className="h-1.5 w-12 bg-pink/40 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
};

const products = [
  {
    title: "Tavio Gateway",
    description: "Accept credit cards, ACH/SEPA, and 20+ crypto assets in one low-latency session. PCI-DSS compliance is handled entirely by our infrastructure.",
    header: <SkeletonCheckout />,
    icon: <CreditCard className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-2 lg:col-span-2",
  },
  {
    title: "Tavio Payouts",
    description: "Bulk payout API for bank accounts and mobile money providers. Automatic FX conversion with real-time status tracking.",
    header: <SkeletonPayouts />,
    icon: <Globe className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Tavio Invoicing",
    description: "Professional billing workflow with automatic reconciliation. HTLC-secured payments mapped to your order lifecycle.",
    header: <SkeletonInvoicing />,
    icon: <FileText className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Tavio On/Off Ramp",
    description: "Bridge fiat and crypto natively. Licensed anchor network connectivity across 174 countries for instant on-chain liquidity.",
    header: <SkeletonRamps />,
    icon: <RefreshCw className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-1 lg:col-span-1",
  },
  {
    title: "Tavio Links",
    description: "No-code payment links for invoices or e-commerce. Share via URL, QR code, or social, with full conversion tracking.",
    header: <SkeletonWhiteLabel />,
    icon: <Palette className="h-4 w-4 text-neutral-500" />,
    span: "md:col-span-2 lg:col-span-1",
  },
];
