"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Users, TrendingUp, Zap, Heart, Share, ThumbsUp, ThumbsDown, ArrowUpRight } from "lucide-react"

interface SocialPost {
  id: string
  author: {
    name: string
    handle: string
    avatar: string
    verified: boolean
    reputation: number
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  sentiment: "positive" | "negative" | "neutral"
  tags: string[]
  attachedAsset?: {
    type: "nft" | "token" | "project"
    name: string
    image?: string
    change?: number
  }
}

const mockPosts: SocialPost[] = [
  {
    id: "post1",
    author: {
      name: "Crypto Analyst",
      handle: "crypto_analyst",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      reputation: 92,
    },
    content:
      "Just analyzed the latest floor price movements for BAYC. Seeing strong support at 18 ETH with increasing volume. This could be a good entry point for those looking to get in. What do you all think? #NFTs #BAYC",
    timestamp: "2h ago",
    likes: 245,
    comments: 58,
    shares: 32,
    sentiment: "positive",
    tags: ["NFT", "BAYC", "Analysis"],
    attachedAsset: {
      type: "nft",
      name: "Bored Ape Yacht Club",
      image: "/placeholder.svg?height=100&width=100",
      change: 5.2,
    },
  },
  {
    id: "post2",
    author: {
      name: "DeFi Wizard",
      handle: "defi_wizard",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      reputation: 88,
    },
    content:
      "Sentiment around Azuki seems to be shifting negative after the latest roadmap update. Volume is down 15% in the last 24h. Be cautious if you're holding. #Azuki #NFTMarkets",
    timestamp: "5h ago",
    likes: 189,
    comments: 42,
    shares: 27,
    sentiment: "negative",
    tags: ["NFT", "Azuki", "Market"],
  },
  {
    id: "post3",
    author: {
      name: "NFT Hunter",
      handle: "nft_hunter",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
      reputation: 76,
    },
    content:
      "Just discovered this amazing new NFT project that's flying under the radar. The art is incredible and the team has a solid background. Worth checking out! #NFTGems",
    timestamp: "8h ago",
    likes: 112,
    comments: 23,
    shares: 15,
    sentiment: "positive",
    tags: ["NFT", "Discovery", "Art"],
  },
  {
    id: "post4",
    author: {
      name: "Blockchain Dev",
      handle: "blockchain_dev",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
      reputation: 95,
    },
    content:
      "The new ERC-6551 standard for NFTs is a game changer. It allows NFTs to own assets and interact with other contracts. This opens up so many possibilities for gaming and metaverse applications. #ERC6551 #NFTDev",
    timestamp: "12h ago",
    likes: 320,
    comments: 87,
    shares: 64,
    sentiment: "positive",
    tags: ["NFT", "Development", "Standards"],
  },
]

export function SocialContentIntegration() {
  const [activeTab, setActiveTab] = useState("feed")
  const [posts, setPosts] = useState<SocialPost[]>(mockPosts)

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "negative":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "neutral":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20"
    }
  }

  const getReputationColor = (reputation: number) => {
    if (reputation >= 90) return "text-green-500"
    if (reputation >= 70) return "text-blue-500"
    if (reputation >= 50) return "text-yellow-500"
    return "text-red-500"
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="feed">
            <MessageCircle className="mr-2 h-4 w-4" />
            Social Feed
          </TabsTrigger>
          <TabsTrigger value="sentiment">
            <TrendingUp className="mr-2 h-4 w-4" />
            Sentiment Analysis
          </TabsTrigger>
          <TabsTrigger value="reputation">
            <Users className="mr-2 h-4 w-4" />
            Reputation System
          </TabsTrigger>
          <TabsTrigger value="discovery">
            <Zap className="mr-2 h-4 w-4" />
            Content Discovery
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-4">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <Card className="border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{post.author.name}</span>
                        {post.author.verified && (
                          <Badge className="bg-blue-500/20 text-blue-500 border-blue-500/20">Verified</Badge>
                        )}
                        <span className="text-gray-400">@{post.author.handle}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-400">{post.timestamp}</span>
                        <span className={`ml-auto text-xs ${getReputationColor(post.author.reputation)}`}>
                          Rep: {post.author.reputation}
                        </span>
                      </div>
                      <p className="mt-2">{post.content}</p>

                      {post.attachedAsset && (
                        <div className="mt-3 p-3 rounded-md bg-gray-800/50 border border-gray-700">
                          <div className="flex items-center gap-3">
                            {post.attachedAsset.image && (
                              <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-800">
                                <img
                                  src={post.attachedAsset.image || "/placeholder.svg"}
                                  alt={post.attachedAsset.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="text-xs text-gray-400">
                                {post.attachedAsset.type === "nft"
                                  ? "NFT Collection"
                                  : post.attachedAsset.type === "token"
                                    ? "Token"
                                    : "Project"}
                              </div>
                              <div className="font-medium">{post.attachedAsset.name}</div>
                              {post.attachedAsset.change !== undefined && (
                                <div
                                  className={`text-xs flex items-center ${
                                    post.attachedAsset.change >= 0 ? "text-green-500" : "text-red-500"
                                  }`}
                                >
                                  {post.attachedAsset.change >= 0 ? "+" : ""}
                                  {post.attachedAsset.change}% (24h)
                                </div>
                              )}
                            </div>
                            <Button variant="outline" size="sm" className="ml-auto border-gray-700">
                              <ArrowUpRight className="mr-2 h-3 w-3" />
                              View
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="bg-gray-800 border-gray-700">
                            #{tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center gap-4">
                        <Button variant="ghost" size="sm" className="gap-1 text-gray-400 hover:text-white">
                          <Heart className="h-4 w-4" />
                          <span>{post.likes}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 text-gray-400 hover:text-white">
                          <MessageCircle className="h-4 w-4" />
                          <span>{post.comments}</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="gap-1 text-gray-400 hover:text-white">
                          <Share className="h-4 w-4" />
                          <span>{post.shares}</span>
                        </Button>
                        <Badge variant="outline" className={`ml-auto ${getSentimentColor(post.sentiment)}`}>
                          {post.sentiment.charAt(0).toUpperCase() + post.sentiment.slice(1)} Sentiment
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle>Market Sentiment Analysis</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Overall Market</h3>
                      <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Neutral</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-green-500" />
                        <span>42%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-500" style={{ width: "58%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>58%</span>
                        <ThumbsDown className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Blue Chip NFTs</h3>
                      <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Positive</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-green-500" />
                        <span>72%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: "72%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>28%</span>
                        <ThumbsDown className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">New Projects</h3>
                      <Badge className="bg-red-500/10 text-red-500 border-red-500/20">Negative</Badge>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="h-5 w-5 text-green-500" />
                        <span>35%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>65%</span>
                        <ThumbsDown className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-6">
                <h3 className="font-medium mb-4">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">#BAYC (72% Positive)</Badge>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    #NFTStaking (85% Positive)
                  </Badge>
                  <Badge className="bg-red-500/10 text-red-500 border-red-500/20">#Azuki (62% Negative)</Badge>
                  <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
                    #NFTMarket (52% Neutral)
                  </Badge>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">#ERC6551 (78% Positive)</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reputation" className="space-y-6">
          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle>Trusted Voices & Analysts</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    name: "Crypto Analyst",
                    handle: "crypto_analyst",
                    avatar: "/placeholder.svg?height=80&width=80",
                    reputation: 92,
                    expertise: ["NFT Analysis", "Market Trends"],
                    followers: "45.2K",
                  },
                  {
                    name: "Blockchain Dev",
                    handle: "blockchain_dev",
                    avatar: "/placeholder.svg?height=80&width=80",
                    reputation: 95,
                    expertise: ["Smart Contracts", "NFT Standards"],
                    followers: "38.7K",
                  },
                  {
                    name: "DeFi Wizard",
                    handle: "defi_wizard",
                    avatar: "/placeholder.svg?height=80&width=80",
                    reputation: 88,
                    expertise: ["NFT Finance", "Tokenomics"],
                    followers: "29.3K",
                  },
                ].map((analyst, index) => (
                  <Card key={analyst.handle} className="border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={analyst.avatar || "/placeholder.svg"} alt={analyst.name} />
                          <AvatarFallback>{analyst.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{analyst.name}</div>
                          <div className="text-sm text-gray-400">@{analyst.handle}</div>
                        </div>
                        <div className={`ml-auto text-lg font-bold ${getReputationColor(analyst.reputation)}`}>
                          {analyst.reputation}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {analyst.expertise.map((skill) => (
                          <Badge key={skill} variant="outline" className="bg-gray-800 border-gray-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="text-sm text-gray-400">{analyst.followers} followers</div>
                        <Button size="sm">Follow</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discovery" className="space-y-6">
          <Card className="border-gray-800">
            <CardHeader>
              <CardTitle>Personalized Content Discovery</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 mb-4">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium mb-2">Connect Your Portfolio</h3>
                <p className="text-gray-400 mb-4 max-w-md">
                  Connect your wallet to discover relevant content based on your portfolio and interests.
                </p>
                <div className="flex gap-2">
                  <Button>Connect Wallet</Button>
                  <Button variant="outline" className="border-gray-800">
                    Browse Trending
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
