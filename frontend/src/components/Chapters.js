// Chapters.js
import chapterData from './data.js';

export function createChaptersView(scene, subject, x = 0, y = 0, width = 600, height = 400) {
  const container = scene.add.container(x, y);

  // Background (whole container)
  const bg = scene.add.rectangle(0, 0, width, height, 0xffff00).setOrigin(0);
  container.add(bg);

  // Title
  const title = scene.add.text(width / 2, 40, `Chapters: ${subject}`, {
    fontSize: '32px',
    color: '#212529',
    fontStyle: 'bold'
  }).setOrigin(0.5);
  container.add(title);

  // Chapter data
  const chapters = chapterData[subject] || [];

  // Grid config
  const cols = 3;
  const cardWidth = width / cols - 20;   // spacing between cards
  const cardHeight = 100;
  const startY = 100;
  const gapX = 20;
  const gapY = 20;

  chapters.forEach((chapter, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const cx = col * (cardWidth + gapX) + 10;
    const cy = startY + row * (cardHeight + gapY);

    // --- Shadow effect ---
    const shadow = scene.add.rectangle(
      cx + 5, cy + 5, cardWidth, cardHeight, 0x000000, 0.25
    ).setOrigin(0).setDepth(-1);
    container.add(shadow);

    // --- Card background ---
    const card = scene.add.rectangle(
      cx, cy, cardWidth, cardHeight, 0xffffff
    )
      .setOrigin(0)
      .setStrokeStyle(2, 0xdee2e6)
      .setInteractive({ useHandCursor: true });

    // rounded corners effect (simulate radius)
    card.radius = 12;

    // --- Text inside card ---
    const item = scene.add.text(
      cx + cardWidth / 2,
      cy + cardHeight / 2,
      chapter,
      {
        fontSize: '20px',
        color: '#212529',
        align: 'center',
        wordWrap: { width: cardWidth - 20 }
      }
    ).setOrigin(0.5);

    // Hover effects
    card.on('pointerover', () => {
      card.setFillStyle(0xf1f3f5);
      card.setStrokeStyle(2, 0x495057);
    });
    card.on('pointerout', () => {
      card.setFillStyle(0xffffff);
      card.setStrokeStyle(2, 0xdee2e6);
    });

    // Click → Sparkle Shower Transition
    card.on('pointerdown', () => {
      // Create particle system at the top
      const particles = scene.add.particles(0, 0, 'sparkle', {
        x: { min: 0, max: scene.scale.width },
        y: 0,
        speedY: { min: 200, max: 400 },     // falling speed
        lifespan: 5000,
        scale: { start: 0.3, end: 0 },
        alpha: { start: 1, end: 0 },
        quantity: 5,
        frequency: 50,
        blendMode: 'ADD'
      });

      // Stop particles after a short duration
      scene.time.delayedCall(2500, () => {
        particles.stop();
      });

      // Transition to Background scene after shower
      scene.time.delayedCall(2500, () => {
        scene.scene.start('Background');
      });
    });

    container.add(shadow);
    container.add(card);
    container.add(item);
  });

  return container;
}
