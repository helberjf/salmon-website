export interface Product {
  id: string;
  name: string;
  description: string;
  preservation: string;
  presentation: string;
  audience: string;
  image: string;
  imageAlt: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface Differential {
  title: string;
  description: string;
}

export interface Audience {
  title: string;
  description: string;
}

export interface CareerEntry {
  period: string;
  role: string;
  organization: string;
  location: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
