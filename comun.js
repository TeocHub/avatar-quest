/* Utilidades compartidas por la portada y todos los tests de Avatar. */
(function(){
  // Trazos de cada símbolo (viewBox 24x24). Sirven para SVG y para canvas.
  const PATHS = {
    air:   ["M12 12a1.5 1.5 0 1 1 1.5 1.5", "M13.5 13.5A3.5 3.5 0 1 1 15.5 9", "M15.5 9A6 6 0 1 1 7 6", "M7 6a8.5 8.5 0 0 1 12 1"],
    water: ["M3 8c2.5-2.5 4.5 2.5 7 0s4.5 2.5 7 0 3 0 4 0", "M3 13c2.5-2.5 4.5 2.5 7 0s4.5 2.5 7 0 3 0 4 0", "M3 18c2.5-2.5 4.5 2.5 7 0s4.5 2.5 7 0 3 0 4 0"],
    earth: ["M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z", "M12 7.8L16.2 12 12 16.2 7.8 12z"],
    fire:  ["M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2.5 1.2-3.8 2.4-5.4.4 1.6 1.2 2.4 2.1 2.6C11.6 8 11.4 5.6 12 3z"]
  };
  const ORDER = ["air", "water", "earth", "fire"];

  window.AVATAR = {
    ELEMENTS: ORDER,
    PATHS,
    glyph(el, extraClass){
      const k = PATHS[el] ? el : "air";
      const d = PATHS[k].map(p => `<path d="${p}"/>`).join("");
      return `<span class="glyph e-${k}${extraClass ? " " + extraClass : ""}" aria-hidden="true"><svg viewBox="0 0 24 24">${d}</svg></span>`;
    },
    // Dibuja un símbolo en un canvas: centro (x, y), tamaño del símbolo en px
    drawGlyph(g, el, x, y, size, color){
      const k = PATHS[el] ? el : "air";
      const s = size / 24;
      g.save();
      g.translate(x - size / 2, y - size / 2); g.scale(s, s);
      g.strokeStyle = color; g.lineWidth = 2; g.lineCap = "round"; g.lineJoin = "round";
      PATHS[k].forEach(p => g.stroke(new Path2D(p)));
      g.restore();
    },
    // Idioma compartido entre la portada y los tests
    LANG_KEY: "avatar-lang",
    pickLang(available){
      let saved = null;
      try { saved = localStorage.getItem(this.LANG_KEY); } catch(e) {}
      if (saved && available.includes(saved)) return saved;
      return (navigator.language || "es").toLowerCase().startsWith("es") ? "es" : "en";
    },
    saveLang(code){ try { localStorage.setItem(this.LANG_KEY, code); } catch(e) {} },
    // Nick compartido entre tests
    NICK_KEY: "avatar-nick",
    readNick(){ try { return localStorage.getItem(this.NICK_KEY) || ""; } catch(e) { return ""; } },
    saveNick(n){ try { localStorage.setItem(this.NICK_KEY, n); } catch(e) {} }
  };
})();
