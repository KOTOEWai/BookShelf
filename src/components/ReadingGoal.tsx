"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Plus, Minus, CheckCircle2, Trophy, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";

interface ReadingGoalProps {
    userId: string;
    initialGoal: number;
    initialRead: number;
}

export default function ReadingGoal({
    userId,
    initialGoal,
    initialRead,
}: ReadingGoalProps) {
    const [goal, setGoal] = useState(initialGoal);
    const [read, setRead] = useState(initialRead);
    const [isOpen, setIsOpen] = useState(false);
    const [tempGoal, setTempGoal] = useState(initialGoal);
    const [tempRead, setTempRead] = useState(initialRead);
    const [isLoading, setIsLoading] = useState(false);

    const percentage = goal > 0 ? Math.min((read / goal) * 100, 100) : 0;
    const isGoalReached = goal > 0 && read >= goal;

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const res = await fetch(`/api/fetchUser/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    readingGoal: tempGoal,
                    booksRead: tempRead,
                }),
            });

            if (res.ok) {
                setGoal(tempGoal);
                setRead(tempRead);
                setIsOpen(false);
                toast.success("Reading goal updated! 📚✨");
            } else {
                throw new Error("Failed to update goal");
            }
        } catch (error) {
            toast.error("Failed to update goal. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full">
            <Card className="overflow-hidden border-none shadow-xl bg-card/40 backdrop-blur-md">
                <CardContent className="p-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex-1 space-y-4 w-full">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                                        <Target className="w-5 h-5 text-primary" />
                                        Reading Goal
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {isGoalReached
                                            ? "Congratulations! You've reached your goal! 🎉"
                                            : goal > 0
                                                ? `You've read ${read} of ${goal} books. Keep going!`
                                                : "Set a goal to track your reading progress!"}
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(true)}
                                    className="rounded-full hover:bg-primary/10 text-primary"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Progress Bar Container */}
                            <div className="relative h-4 w-full bg-muted/30 rounded-full overflow-hidden border border-primary/10">
                                <motion.div
                                    className={`absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-primary to-accent shadow-[0_0_15px_rgba(var(--primary),0.5)]`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${percentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>

                            <div className="flex justify-between items-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                                <span>{read} Books Read</span>
                                <span>Goal: {goal} Books</span>
                            </div>
                        </div>

                        {/* Icon/Badge Section */}
                        <div className="flex-shrink-0">
                            <AnimatePresence mode="wait">
                                {isGoalReached ? (
                                    <motion.div
                                        key="reached"
                                        initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="relative"
                                    >
                                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                                        <Trophy className="w-20 h-20 text-amber-500 relative z-10" />
                                        <motion.div
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute -top-2 -right-2 bg-primary p-1.5 rounded-full shadow-lg"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </motion.div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="progress"
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.5, opacity: 0 }}
                                        className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/5 border-2 border-dashed border-primary/20"
                                    >
                                        <span className="text-2xl font-black text-primary/40">
                                            {Math.round(percentage)}%
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Edit Goal Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px] bg-card/95 backdrop-blur-xl border-primary/10">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <Target className="w-6 h-6 text-primary" />
                            Update Reading Goal
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-4">
                            <Label htmlFor="goal" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                How many books do you want to read?
                            </Label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full shadow-sm hover:border-primary/50 transition-colors"
                                    onClick={() => setTempGoal(Math.max(0, tempGoal - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    id="goal"
                                    type="number"
                                    value={tempGoal}
                                    onChange={(e) => setTempGoal(parseInt(e.target.value) || 0)}
                                    className="text-center text-xl font-bold bg-muted/20 border-primary/10 rounded-xl"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full shadow-sm hover:border-primary/50 transition-colors"
                                    onClick={() => setTempGoal(tempGoal + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Label htmlFor="read" className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                                Books read so far
                            </Label>
                            <div className="flex items-center gap-4">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full shadow-sm hover:border-primary/50 transition-colors"
                                    onClick={() => setTempRead(Math.max(0, tempRead - 1))}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input
                                    id="read"
                                    type="number"
                                    value={tempRead}
                                    onChange={(e) => setTempRead(parseInt(e.target.value) || 0)}
                                    className="text-center text-xl font-bold bg-muted/20 border-primary/10 rounded-xl"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full shadow-sm hover:border-primary/50 transition-colors"
                                    onClick={() => setTempRead(tempRead + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="gap-2 sm:gap-0 sm:flex-row">
                        <Button variant="ghost" onClick={() => setIsOpen(false)} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button
                            onClick={handleUpdate}
                            disabled={isLoading}
                            className="rounded-xl shadow-lg shadow-primary/20 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                        >
                            {isLoading ? "Updating..." : "Save Changes"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
