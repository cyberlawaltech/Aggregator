"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Login form */}
      <div className="relative flex w-full flex-col justify-center bg-[#0a0c10] p-6 md:w-1/2 lg:w-2/5">
        <div className="absolute top-6 left-6 flex items-center gap-2">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-foz7U7LrEo6bpkXDr7jd5Mj8iwqWua.png"
            alt="Web3 Logo"
            className="h-10 w-10"
          />
          <span className="text-lg font-semibold text-primary">Web3 Agg</span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Coin-List Data Aggregator
              </span>
            </h1>
            <p className="mb-8 text-gray-400">
              Access all your crypto data in one place. Connect your wallet to get started.
            </p>

            <Card className="border-gray-800 bg-dark-100">
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>Enter your credentials to access your account</CardDescription>
              </CardHeader>
              <CardContent>
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        placeholder="name@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-800 bg-dark-200"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="#" className="text-xs text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-gray-800 bg-dark-200"
                      />
                    </div>
                    <Button className="w-full">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col items-center justify-center gap-2 border-t border-gray-800 pt-4">
                <div className="text-center text-sm text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Link href="#" className="text-primary hover:underline">
                    Sign up
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-gray-800">
                    <User className="mr-2 h-4 w-4" />
                    Demo Account
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        <div className="absolute bottom-6 left-6 flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-xs text-gray-400">
            Privacy Policy
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-gray-400">
            Terms of Service
          </Button>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-full bg-[#0a0c10] md:block md:w-1/2 lg:w-3/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0c10]/80 to-transparent" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Wallets-jump-0Zw9NeRTD8Sxc5H7whuwH8dzRX7dkB.jpeg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute bottom-6 right-6 max-w-md text-right">
          <h2 className="text-2xl font-bold text-white">Manage All Your Crypto Wallets</h2>
          <p className="mt-2 text-gray-300">
            Connect multiple wallets, track your portfolio, and execute trades across different chains.
          </p>
        </div>
      </div>
    </div>
  )
}
