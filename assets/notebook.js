document.addEventListener("DOMContentLoaded", () => {
    const entries = document.querySelectorAll(".entry-title");
    const blocks = document.querySelectorAll(".detail-block");
  
    entries.forEach(entry => {
      entry.addEventListener("click", () => {
        const targetId = entry.getAttribute("data-target");
        blocks.forEach(b => {
          b.style.display = (b.id === targetId) ? "block" : "none";
        });
      });
    });
  });

<script>
  function scaleContent() {
    const content = document.querySelector('.content');
    const scaleY = window.innerHeight / 900;
    const scale = scaleY;
    content.style.transform = `scale(${scaleY})`;
  }

  window.addEventListener('resize', scaleContent);
  window.addEventListener('DOMContentLoaded', scaleContent);
</script>
