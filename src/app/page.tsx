'use client'

import { animate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function Counter({ from, to }:{from:any, to:any}) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node:any = nodeRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(node);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const node = nodeRef.current;

    const controls = animate(from, to, {
      duration: 1.5,
      onUpdate(value) {
        if(node) node.textContent = value.toFixed(0);
      },
    });

    return () => controls.stop();
  }, [from, to, isVisible]);

  return <span ref={nodeRef} />;
}

const Countdown = ({ targetDate }:{targetDate:any}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: Record<string, number> = {};

    if (difference > 0) {
      timeLeft = {
        Jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
        Heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
        Minutes: Math.floor((difference / 1000 / 60) % 60),
        Secondes: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents:any = [];

  Object.keys(timeLeft).forEach((interval:string) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col gap-2">
        <p className={"text-5xl md:text-8xl font-semibold "+(interval==='Secondes'?'bg-gradient-to-r from-[#612DFC] to-[#FF2727] bg-clip-text text-transparent':'')}>{timeLeft[interval]}</p>
        <p className="font-semibold text-xl">{interval}{" "}</p>
      </div>
    );
  });

  return (
    <div className="flex gap-4 md:gap-12">
      {timerComponents.length ? timerComponents : <span>Le Hackathon a malheureusement déjà eu lieu !</span>}
    </div>
  );
};

function Star() {
  return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M4.72793 0.48528L0.485291 4.72792L8.97057 13.2132L0.485277 21.6985L4.72792 25.9411L13.2132 17.4558L21.6985 25.9411L25.9411 21.6985L17.4558 13.2132L25.9411 4.72792L21.6985 0.485284L13.2132 8.97056L4.72793 0.48528ZM13.2132 8.97056L8.97057 13.2132L13.2132 17.4558L17.4558 13.2132L13.2132 8.97056Z" fill="black"/>
  </svg>  
}

export default function Home() {
  const targetDate = '2025-04-04T23:59:59';

  const team = [
    {name:'Salim', title: 'Volunteer', image: 'salim.png'},
    {name:'Salim', title: 'Volunteer', image: 'salim.png'},
    {name:'Salim', title: 'Volunteer', image: 'salim.png'},
    {name:'Salim', title: 'Volunteer', image: 'salim.png'},
    {name:'Salim', title: 'Volunteer', image: 'salim.png'},
    {name:'Salim', title: 'Volunteer', image: 'salim.png'},
  ]
  return (
    <div className="flex flex-col items-center overflow-hidden">
      <div className="flex justify-between container items-center px-4 md:px-0 py-12">
          <div>
            <p className="font-bold">Hackathon</p>
          </div>
          <div className="flex gap-4 md:gap-8">
            <p>Sponsors</p>
            <p>FAQ</p>
            <p>Lieu</p>
          </div>
      </div>

      <div className="container pt-8 pb-20 md:pt-24 md:pb-40 flex flex-col gap-8 px-4 md:px-0">
        <h1 className="text-4xl md:text-8xl font-bold relative w-fit">
          <div className="absolute top-0 right-0"><Star /></div>
          <div className="absolute bottom-0 right-40 hidden md:block"><Star /></div>
          <span className="text-[#612DFC]">From LLM to AGI</span><br />
          <span>Le premier Hackathon IA</span><br/>
          <span className="text-[#FF2727]">pour les étudiants</span>
        </h1>
        <p className="text-xl">Tentez votre chance en participant à notre hackathon de 48 heures.<br/>Obtenez de l&apos;aide de la part de mentors.</p>
        
        <div className="flex flex-col gap-8 md:flex-row justify-between container items-center px-4 md:px-0">
          <div>
            <button className="py-4 px-20 bg-[#612DFC] w-fit text-white font-bold">Participer</button>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="flex gap-4 md:gap-12">
              <Countdown targetDate={targetDate} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-[#612DFC] to-[#FF2727] min-h-[24rem] w-full flex flex-col items-center py-12 md:py-24 px-4 md:px-0">
        <div className="container">
          <p className="text-white font-bold text-xl">Nos sponsors</p>
        </div>
      </div>

      <div className="container my-24 md:my-60 flex items-center justify-center">
        <h2 className="text-5xl md:text-9xl font-bold w-fit relative">+<Counter from={0} to={30000} />€ de Prix
        <div className="absolute top-0 -right-20"><Star /></div></h2>
      </div>

      <div className="bg-gradient-to-r from-[#612DFC] to-[#FF2727] text-white min-h-80 w-full flex flex-col items-center py-12 md:py-24 px-4 md:px-0">
      <div className="container flex flex-col gap-2 px-4 md:px-0">
        <p className="font-bold text-xl">Notre Panel</p>
        <p className="text-white/80">Composé d&apos;experts.</p>
        <div className="flex flex-col items-center md:flex-row pt-2 gap-8 px-8 md:px-0">
          {team.map((personne, index:number) => (
            <div className="flex flex-col" key={index}>
              <div className="bg-black p-2 mb-2">
                <img className="md:w-40 aspect-square object-cover rounded-sm" src={'/'+personne.image}/>
              </div>
              <p className="font-bold">{personne.name}</p>
              <p className="text-white/80">{personne.title}</p>
            </div>
          ))}
        </div>
      </div>
      </div>

      <div className="container py-4 md:py-20 px-4 md:px-0 flex flex-col gap-2">
        <p className="font-bold text-xl">Le lieu</p>
        <p className="text-black/70 mb-2">Le hackathon se déroulera dans l&apos;enceinte de l&apos;école ESSEC.</p>
        <iframe className="w-full min-h-96" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5231.603174087223!2d2.075699076864314!3d49.03338058837544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6f53ae44bd367%3A0xa3f3ee2330ea2664!2sESSEC%20Business%20School%20-%20Campus%20de%20Cergy-Pontoise!5e0!3m2!1sfr!2sfr!4v1740253142193!5m2!1sfr!2sfr" loading="lazy"></iframe>
      </div>

      <div className="container py-4 md:py-20 px-4 md:px-0 flex flex-col gap-4">
        <p className="font-bold text-xl">FAQ</p>
        <p className="text-black/70">Questions fréquemment posées</p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Qui peut participer au hackathon ?</AccordionTrigger>
            <AccordionContent>
              Le hackathon est ouvert à tous les étudiants, développeurs, designers et entrepreneurs passionnés par l&apos;innovation.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Dois-je venir avec une équipe ?</AccordionTrigger>
            <AccordionContent>
              Vous pouvez venir seul ou en équipe. Si vous venez seul, nous organiserons une session de formation d&apos;équipe au début de l&apos;événement.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Que dois-je apporter ?</AccordionTrigger>
            <AccordionContent>
              Apportez votre ordinateur portable, chargeur et tout autre équipement dont vous pourriez avoir besoin. Des collations et boissons seront fournis.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Y aura-t-il des mentors disponibles ?</AccordionTrigger>
            <AccordionContent>
              Oui, des mentors expérimentés seront présents tout au long de l&apos;événement pour vous guider et vous conseiller.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Comment les projets seront-ils évalués ?</AccordionTrigger>
            <AccordionContent>
              Les projets seront évalués par notre panel d&apos;experts selon plusieurs critères : innovation, faisabilité technique, impact potentiel et qualité de la présentation.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
