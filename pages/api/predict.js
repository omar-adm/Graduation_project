import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { Age, Gender, Family_Diabetes, highBP, PhysicallyActive, BMI, Smoking, Alcohol, Sleep, SoundSleep, RegularMedicine, JunkFood, Stress, BPLevel, Pregnancies, Pdiabetes, UrinationFreq } = req.body

      // Prepare the input for the Python script
      const input = `${Age},${Gender},${Family_Diabetes},${highBP},${PhysicallyActive},${BMI},${Smoking},${Alcohol},${Sleep},${SoundSleep},${RegularMedicine},${JunkFood},${Stress},${BPLevel},${Pregnancies},${Pdiabetes},${UrinationFreq}`

      // Run the Python script
      const { stdout, stderr } = await execAsync(`python MLCode.py ${input}`)

      if (stderr) {
        console.error('stderr:', stderr)
        res.status(500).json({ error: 'An error occurred while processing your data.' })
        return
      }

      // Parse the output from the Python script
      const [diabetic, probability, accuracy, sensitivity, specificity] = stdout.trim().split(',')

      res.status(200).json({
        diabetic: diabetic === '1',
        probability: parseFloat(probability),
        accuracy: parseFloat(accuracy),
        sensitivity: parseFloat(sensitivity),
        specificity: parseFloat(specificity)
      })
    } catch (error) {
      console.error('Error:', error)
      res.status(500).json({ error: 'An error occurred while processing your data.' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}