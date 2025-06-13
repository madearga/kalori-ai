'use client';

import { useState } from 'react';
import { Loader2Icon } from 'lucide-react';
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import {
  UploadDropzone,
} from "@/components/ui/upload-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";


interface AnalysisResult {
  analysis: {
    foodName: string;
    calories: number;
    macronutrients: {
      protein: number;
      carbs: number;
      fat: number;
    };
    foodItems: string[];
    confidence: number;
  };
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (file: File) => {
    if (selectedImage) {
      toast.error("Please remove the current image before uploading a new one");
      return;
    }
    setImageFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleAnalyze = async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');

      const result = await response.json();
      setAnalysis(result);
    } catch {
      toast.error("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      <div className="min-h-screen p-8 flex items-center justify-center  -mt-10 md:h-[calc(100vh-64px)]">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          {/* Image Preview Section */}
          <Card className="p-4">
            {selectedImage ? (
              <div className="space-y-4">
                <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                  <Image
                    src={selectedImage}
                    alt="Food preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button 
                  onClick={() => {
                    setSelectedImage(null);
                    setImageFile(null);
                    setAnalysis(null);
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Remove Image
                </Button>
              </div>
            ) : (
              <div className="text-center text-muted-foreground h-[400px] flex items-center justify-center">
                No image selected please upload an image to analyze
              </div>
            )}
          </Card>

          <div className="space-y-6">
            {/* Upload Section */}
            <Card className="p-6">
              <UploadDropzone
                onClientUpload={handleImageUpload}
                className="w-full"
              />
              <Button
                className="w-full mt-4"
                onClick={handleAnalyze}
                disabled={!imageFile || isAnalyzing}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze Image'
                )}
              </Button>
            </Card>

            {/* Analysis Results */}
            {analysis && (
              <Card className="p-6 ">
                <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Food Name</h3>
                    <div className="text-xl font-medium">
                      {analysis.analysis.foodName}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Calories</h3>
                    <div className="text-3xl font-bold">
                      {analysis.analysis.calories} kcal
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Macronutrients</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Protein</span>
                          <span>{analysis.analysis.macronutrients.protein}g</span>
                        </div>
                        <Progress value={analysis.analysis.macronutrients.protein} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Carbs</span>
                          <span>{analysis.analysis.macronutrients.carbs}g</span>
                        </div>
                        <Progress value={analysis.analysis.macronutrients.carbs} />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span>Fat</span>
                          <span>{analysis.analysis.macronutrients.fat}g</span>
                        </div>
                        <Progress value={analysis.analysis.macronutrients.fat} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Detected Foods</h3>
                    <div className="flex flex-wrap gap-2">
                      {analysis.analysis.foodItems.map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-secondary rounded-full text-sm"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    Confidence Score: {(analysis.analysis.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
