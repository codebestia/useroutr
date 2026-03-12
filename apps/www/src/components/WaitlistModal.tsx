"use client";

import * as React from "react";
import { Dialog } from "@base-ui/react";
import { X, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "./ui/button";

interface WaitlistModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistModal({ open, onOpenChange }: WaitlistModalProps) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (open) {
      // Reveal animation
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current, 
        { opacity: 0 }, 
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
      tl.fromTo(contentRef.current,
        { scale: 0.9, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
        "-=0.2"
      );
      tl.from(".modal-item", {
        opacity: 0,
        y: 10,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.3");
    }
  }, [open]);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop
          ref={overlayRef}
          className="fixed inset-0 z-2000 bg-black/60 backdrop-blur-sm"
        />
        <Dialog.Popup
          ref={contentRef}
          className="fixed left-1/2 top-1/2 z-2001 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 outline-none p-1"
        >
          <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 p-8 shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-linear-to-r from-transparent via-white/20 to-transparent" />
            <div className="absolute -inset-px bg-linear-to-b from-white/5 to-transparent rounded-[inherit] -z-10" />

            {/* Header */}
            <div className="flex justify-between items-start mb-10">
              <div className="flex items-center gap-3 modal-item">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <ShieldCheck size={20} className="text-zinc-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-white">Join the Waitlist</h2>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">Reserved for Early Adopters</p>
                </div>
              </div>
              <Dialog.Close className="modal-item p-2 rounded-lg hover:bg-white/5 transition-colors text-zinc-600 hover:text-white">
                <X size={20} />
              </Dialog.Close>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="modal-item space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block px-1">Institutional Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-700" size={18} />
                  <input 
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full h-14 bg-white/2 border border-white/5 rounded-2xl pl-12 pr-6 font-display text-white placeholder:text-zinc-800 focus:outline-none focus:border-white/20 transition-all focus:bg-white/5"
                  />
                </div>
              </div>

              <div className="modal-item space-y-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-zinc-500 block px-1">What are you building?</label>
                <select className="w-full h-14 bg-white/2 border border-white/5 rounded-2xl px-6 font-display text-white focus:outline-none focus:border-white/20 transition-all focus:bg-white/5 appearance-none cursor-pointer">
                  <option className="bg-zinc-950">Cross-border Payments</option>
                  <option className="bg-zinc-950">RWA Tokenization</option>
                  <option className="bg-zinc-950">DeFi Protocol</option>
                  <option className="bg-zinc-950">Market Maker</option>
                </select>
              </div>

              <div className="modal-item pt-4">
                <Button variant="primary" className="w-full h-14 rounded-2xl text-base group" onClick={() => onOpenChange(false)}>
                  Request Access
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Button>
                <p className="text-center font-mono text-[9px] text-zinc-700 mt-4 uppercase tracking-tighter">
                  By requesting access, you agree to our <span className="text-zinc-500 underline cursor-pointer">Institutional Terms</span>
                </p>
              </div>
            </form>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
