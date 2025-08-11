import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabaseUrl = `{import.meta.env.VITE_SUPABASE_URL}`
const supabaseAnonKey = `{import.meta.env.VITE_SUPABASE_ANON_KEY}`
const supabase = createClient(supabaseUrl, supabaseAnonKey)


async function uploadFiles(directory: string, bucket: string) {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isDirectory()) {
      await uploadFiles(filePath, bucket)
    } else {
      const fileContent = fs.readFileSync(filePath)
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath.replace('public/', ''), fileContent)

      if (error) {
        console.error(`Error uploading ${file}:`, error.message)
      } else {
        console.log(`Successfully uploaded ${file}`)
      }
    }
  }
}

uploadFiles('public', 'assets-imm').catch(console.error)