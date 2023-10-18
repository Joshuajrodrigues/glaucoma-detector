# Preface

In 2021, I was in my final year of college, working on a college project that marked the beginning of my software development journey. It was a collaborative effort, originally implemented in Python. Our project received first place among all engineering departments, which was a remarkable achievement.

[Original project source](https://github.com/Joshuajrodrigues/Glaucoma-detection-using-fuzzy-c-strange-point-algorithm)

Despite our success, I was determined to make it even better because I wasn't entirely satisfied with the initial outcome. I decided to rebuild it using Next.js and the HTML Canvas API, which resulted in a more satisfying version.

# The Problem

In the world of clustering algorithms, numerous options like the well-known K-means exist. The initial problem statement in college was to compare various clustering algorithms with the Fuzzy C Strange Point Algorithm, which our professor had introduced. The goal was to use these algorithms for glaucoma detection.

However, my personal problem statement was to create a user-friendly and accessible application for segmenting the cup and disk of the eye using the given algorithm.

# The Solution

The Glaucoma detector presents a straightforward user interface for quickly calculating the cup and disk using the Canvas API, a task that was challenging to accomplish with Python alone.
![dashboard](/public/gd/dash.png)
**Not for medical use**

# Challenges

1. **Area Calculation:** After separating the image, determining the area of the disk and cup proved to be challenging.

   - **Solution:** I provided two sets of handles that users can manually adjust to obtain more accurate area measurements.
  ![cup](/public/gd/cup.png)
  ![disk](/public/gd/disk.png)

2. **Eye Fundus Images:** Issues arose with the quality of eye fundus images, particularly when images were too blurry or unclear, which disrupted the image separation process.

   - **Solution:** I implemented pre-processing techniques to enhance image contrast before the separation process. Additionally, I included a function to rerun the clustering algorithm to eliminate excess noise.

# Future Plans

- **WebAssembly (Wasm):** While JavaScript is fast, it's not optimized for tasks like this. I plan to explore the use of WebAssembly with languages like Rust or Lua to improve performance.

- **Accuracy:** The current system has limitations in accuracy, mainly relying on the performance of the underlying algorithm. Although the Fuzzy C Strange Point Algorithm outperforms K-means and Fuzzy C-means in terms of performance and slightly in quality, all three algorithms struggle with low-quality images that doctors can diagnose without issue. Therefore, I aim to integrate a different algorithm in the future to enhance accuracy.

 
