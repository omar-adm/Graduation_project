'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function HealthRiskFormComponent() {
  const [formData, setFormData] = useState({
    Age: '',
    Gender: '',
    Family_Diabetes: '',
    highBP: '',
    PhysicallyActive: '',
    BMI: '',
    Smoking: '',
    Alcohol: '',
    Sleep: '',
    SoundSleep: '',
    RegularMedicine: '',
    JunkFood: '',
    Stress: '',
    BPLevel: '',
    Pregnancies: '',
    Pdiabetes: '',
    UrinationFreq: '',
    Diabetic: ''
  })

  const [predictionResults, setPredictionResults] = useState(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendFormData = async (data) => {
    try {
      const response = await fetch('https://vercel.com/omar-adms-projects/health-risk-assessment-backend/BgnBXNZhfSM3xv9gHZ6vw49SzPZX', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const results = await response.json()
      setPredictionResults(results)
    } catch (error) {
      console.error('Error:', error)
      alert('An error occurred while processing your data.')
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    sendFormData(formData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Health Risk Assessment</CardTitle>
        <CardDescription>Please fill out the form below to assess your health risks.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="Age">Age</Label>
              <Input
                id="Age"
                name="Age"
                type="number"
                placeholder="Enter your age"
                value={formData.Age}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Gender">Gender</Label>
              <Select onValueChange={(value) => handleSelectChange('Gender', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="BMI">BMI</Label>
              <Input
                id="BMI"
                name="BMI"
                type="number"
                placeholder="Enter your BMI"
                value={formData.BMI}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="BPLevel">Blood Pressure Level</Label>
              <Input
                id="BPLevel"
                name="BPLevel"
                type="text"
                placeholder="Enter your BP level"
                value={formData.BPLevel}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            {[
              { name: 'Family_Diabetes', label: 'Do you have History of Family Diabetes?' },
              { name: 'highBP', label: 'Do you have High Blood Pressure?' },
              { name: 'PhysicallyActive', label: 'Are you Physically Active?' },
              { name: 'Smoking', label: 'Do you Smoke?' },
              { name: 'Alcohol', label: 'Do you consumpt Alcohol?' },
              { name: 'RegularMedicine', label: 'Do you maintain Regular Medicine?' },
              { name: 'JunkFood', label: 'Do you eat Junk Food?' },
              { name: 'Stress', label: 'Do you have High Stress Levels?' },
              { name: 'Pdiabetes', label: 'Do you have Prediabetes?' },
            ].map((item) => (
              <div key={item.name} className="space-y-2">
                <Label>{item.label}</Label>
                <RadioGroup
                  name={item.name}
                  onValueChange={(value) => handleSelectChange(item.name, value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`${item.name}-yes`} />
                    <Label htmlFor={`${item.name}-yes`}>Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`${item.name}-no`} />
                    <Label htmlFor={`${item.name}-no`}>No</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <Label htmlFor="Sleep">Sleep Duration (hours)</Label>
              <Input
                id="Sleep"
                name="Sleep"
                type="number"
                placeholder="Enter sleep duration"
                value={formData.Sleep}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="SoundSleep">Sound Sleep Duration (hours)</Label>
              <Input
                id="SoundSleep"
                name="SoundSleep"
                type="number"
                placeholder="Enter sound sleep duration"
                value={formData.SoundSleep}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="Pregnancies">Number of Pregnancies</Label>
              <Input
                id="Pregnancies"
                name="Pregnancies"
                type="number"
                placeholder="Enter number of pregnancies"
                value={formData.Pregnancies}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="UrinationFreq">Urination Frequency</Label>
              <Select onValueChange={(value) => handleSelectChange('UrinationFreq', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit Assessment</Button>
        </form>
      </CardContent>
      {predictionResults && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Prediction Results</h3>
          <p>Diabetic: {predictionResults.diabetic ? 'Yes' : 'No'}</p>
          <p>Probability: {(predictionResults.probability * 100).toFixed(2)}%</p>
          <h4 className="text-md font-semibold mt-4 mb-2">Model Performance:</h4>
          <ul>
            <li>Accuracy: {(predictionResults.accuracy * 100).toFixed(2)}%</li>
            <li>Sensitivity: {(predictionResults.sensitivity * 100).toFixed(2)}%</li>
            <li>Specificity: {(predictionResults.specificity * 100).toFixed(2)}%</li>
          </ul>
        </div>
      )}
    </Card>
  )
}