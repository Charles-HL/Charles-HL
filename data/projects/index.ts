import type { Project } from "../../src/types/project";
import catalogueDonneesTechniques from "./catalogue-donnees-techniques";
import ecosystemeSiPme from "./ecosysteme-si-pme";
import plateformeECommerceHeadless from "./plateforme-e-commerce-headless";
import apiMetierCentrale from "./api-metier-centrale";
import ssoIdentiteCentralisee from "./sso-identite-centralisee";
import erpPointDeVenteConnecte from "./erp-point-de-vente-connecte";
import importCataloguesFournisseurs from "./import-catalogues-fournisseurs";
import infrastructureDevopsObservabilite from "./infrastructure-devops-observabilite";
import designSystemMonorepo from "./design-system-monorepo";
import gestionAtelierReparation from "./gestion-atelier-reparation";
import locationMateriel from "./location-materiel";
import venteInstallationRobots from "./vente-installation-robots";
import rapprochementBancaire from "./rapprochement-bancaire";
import siteVitrineSeoDevis from "./site-vitrine-seo-devis";
import chaineDeveloppementAgentique from "./chaine-developpement-agentique";
import boutiqueEnLigneClickAndCollect from "./boutique-en-ligne-click-and-collect";

/** Register every project file here; sorting happens in `src/lib/projects.ts`. */
export const projects: Project[] = [
  catalogueDonneesTechniques,
  ecosystemeSiPme,
  plateformeECommerceHeadless,
  apiMetierCentrale,
  ssoIdentiteCentralisee,
  erpPointDeVenteConnecte,
  importCataloguesFournisseurs,
  infrastructureDevopsObservabilite,
  designSystemMonorepo,
  gestionAtelierReparation,
  locationMateriel,
  venteInstallationRobots,
  rapprochementBancaire,
  siteVitrineSeoDevis,
  chaineDeveloppementAgentique,
  boutiqueEnLigneClickAndCollect,
];
