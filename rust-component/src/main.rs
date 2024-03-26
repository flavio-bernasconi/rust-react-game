use rand::Rng;
use noise::{NoiseFn, Perlin};

struct Point {
    x: usize,
    y: usize,
}

fn get_origin(grid: &[Vec<f64>]) -> Option<Point> {
    for (y, row) in grid.iter().enumerate() {
        for (x, &value) in row.iter().enumerate() {
            if value >= 0.5 {
                return Some(Point { x, y });
            }
        }
    }
    None
}

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

fn main() {
    let perlin_grid = generate_perlin_grid(10, 10);
    println!("{:?}", perlin_grid);
    if let Some(origin) = get_origin(&perlin_grid) {
        println!("First point with value 1 found at: ({}, {})", origin.x, origin.y);
    } else {
        println!("No point with value 1 found in the grid.");
    }
}
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
