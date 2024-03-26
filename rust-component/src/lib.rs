use rand::Rng;
use noise::{NoiseFn, Perlin};
use wasm_bindgen::prelude::*;


fn generate_perlin_grid(width: usize, height: usize)-> Vec<Vec<f64>> {
    let perlin = Perlin::new(0);

    let width = width;
    let height = height;

    let mut grid = vec![vec![0.0; width]; height];

    for y in 0..height {
        for x in 0..width {
            let seed: f64 = f64::from(rand::thread_rng().gen_range(0..=10));
            let value = perlin.get([x as f64 / 8.0, y as f64 / 8.0, seed]);
            let normalized_value = (value + 1.0) / 2.0;
            let scaled_value = (normalized_value * 2.0) as u8;
            grid[y][x] = scaled_value as f64;
            print!("{:3} ", scaled_value);
        }
        println!("");
    }
    grid
}

#[wasm_bindgen]
pub fn generate_map() -> Result<JsValue, JsValue>{
    let grid = generate_perlin_grid(10,10);
    Ok(serde_wasm_bindgen::to_value(&grid)?)
}
