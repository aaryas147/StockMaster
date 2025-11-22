import React, { useState } from 'react';
import { Package, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface LoginPageProps {
  onLogin: (role: 'manager' | 'staff') => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#001D39] via-[#0A4174] to-[#49769F] p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#7BBDE8] rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-[#7BBDE8] p-3 rounded-xl">
              <Package className="w-8 h-8 text-[#001D39]" />
            </div>
            <div>
              <h2 className="text-2xl text-white">
                <span className="text-[#7BBDE8]">Stock</span>Master
              </h2>
              <p className="text-[#BDD8E9] text-sm">Inventory Management System</p>
            </div>
          </div>

          <div className="space-y-8 mt-20">
            <div>
              <h3 className="text-4xl text-white mb-4">
                Streamline Your Inventory Operations
              </h3>
              <p className="text-[#BDD8E9] text-lg">
                Enterprise-level inventory management with real-time tracking, 
                automated workflows, and comprehensive reporting.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-3xl text-white mb-2">99.9%</p>
                <p className="text-[#BDD8E9] text-sm">Accuracy Rate</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <p className="text-3xl text-white mb-2">50K+</p>
                <p className="text-[#BDD8E9] text-sm">Items Tracked</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[#BDD8E9] text-sm relative z-10">
          © 2025 StockMaster. All rights reserved.
        </p>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-foreground mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <button type="button" className="text-sm text-accent hover:underline">
                Forgot password?
              </button>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => onLogin('manager')}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                Sign in as Manager
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              
              <Button
                onClick={() => onLogin('staff')}
                variant="outline"
                className="w-full"
              >
                Sign in as Staff
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button className="text-accent hover:underline">
                Contact administrator
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
