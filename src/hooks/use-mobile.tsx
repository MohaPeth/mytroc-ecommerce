
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Fonction pour déterminer si l'écran est mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Observer le changement de taille d'écran
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Configuration de l'observer pour les changements de taille d'écran
    if (mql.addEventListener) {
      mql.addEventListener("change", checkIfMobile)
    } else {
      // Fallback pour les anciens navigateurs
      window.addEventListener('resize', checkIfMobile)
    }
    
    // Vérification initiale
    checkIfMobile()
    
    // Nettoyage
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkIfMobile)
      } else {
        window.removeEventListener('resize', checkIfMobile)
      }
    }
  }, [])

  // Si undefined (pendant l'initialisation), considère comme non-mobile
  return !!isMobile
}

// Hook pour obtenir la largeur de l'écran
export function useWindowSize() {
  const [windowSize, setWindowSize] = React.useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  React.useEffect(() => {
    // Gestionnaire pour mettre à jour la taille de la fenêtre
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    
    // Ajouter l'écouteur d'événement
    window.addEventListener("resize", handleResize)
    
    // Appel initial pour définir la taille
    handleResize()
    
    // Nettoyage
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return windowSize
}
