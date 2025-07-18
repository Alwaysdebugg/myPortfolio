import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  const debug = {
    currentWorkingDirectory: process.cwd(),
    contentPath: path.join(process.cwd(), 'content'),
    blogsPath: path.join(process.cwd(), 'content/blogs'),
    contentExists: false,
    blogsExists: false,
    files: [],
    error: null
  }

  try {
    // 检查content目录
    debug.contentExists = fs.existsSync(debug.contentPath)
    console.log('Content directory exists:', debug.contentExists)
    
    // 检查blogs目录
    debug.blogsExists = fs.existsSync(debug.blogsPath)
    console.log('Blogs directory exists:', debug.blogsExists)
    
    if (debug.blogsExists) {
      try {
        debug.files = fs.readdirSync(debug.blogsPath)
        console.log('Files in blogs directory:', debug.files)
      } catch (readError) {
        debug.error = `Error reading blogs directory: ${readError}`
      }
    }
    
    // 尝试不同的路径
    const alternativePaths = [
      path.join(process.cwd(), 'public/content/blogs'),
      path.join(process.cwd(), 'src/content/blogs'),
      '/Users/jackyfeng/Desktop/github-project/myPortfolio/content/blogs'
    ]
    
    const pathChecks = alternativePaths.map(altPath => ({
      path: altPath,
      exists: fs.existsSync(altPath),
      files: fs.existsSync(altPath) ? fs.readdirSync(altPath).filter(f => f.endsWith('.md')) : []
    }))
    
    return NextResponse.json({
      debug,
      alternativePaths: pathChecks
    })
    
  } catch (error) {
    debug.error = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ debug, error: debug.error }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'