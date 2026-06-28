# Jones Automation Exercise — Reponses QA (version francaise pour comprehension)

> Cette version est faite pour comprendre le raisonnement.  
> La version a envoyer a Jones reste probablement `qa-responses.md`, en anglais.

## a. Problemes trouves dans le mock-up de billing

Globalement, le widget de paiement est comprehensible, mais il y a plusieurs problemes qui peuvent impacter la securite, l'utilisabilite et la clarte du paiement.

Du point de vue **securite**, l'ecran demande a l'utilisateur d'entrer des informations sensibles de carte bancaire, mais il ne montre pas d'element clair pour le rassurer, comme "Secure payment", une mention de chiffrement, ou le logo d'un prestataire de paiement reconnu. Cela peut reduire la confiance de l'utilisateur au moment d'entrer ses informations de paiement. En plus, il n'y a pas de champ CVV/CVC, ce qui peut reduire la qualite de verification de la carte selon le fonctionnement du paiement.

Du point de vue **fonctionnel**, le montant du paiement est affiche seulement comme `30.00`, sans devise. L'utilisateur ne peut pas savoir si c'est en USD, EUR ou une autre devise. L'ecran n'explique pas non plus ce que l'utilisateur paie exactement, si c'est un paiement unique ou recurrent, ni si les taxes sont incluses. Un autre probleme est que l'utilisateur doit choisir manuellement le type de carte. Cela peut creer une incoherence, par exemple si l'utilisateur selectionne VISA mais entre un numero de MasterCard. Une meilleure approche serait de detecter automatiquement le type de carte a partir du numero.

Le formulaire est aussi assez strict a certains endroits ou il pourrait etre plus flexible. Par exemple, le champ numero de carte indique "No dashes or spaces". En pratique, beaucoup d'utilisateurs copient ou tapent les numeros de carte avec des espaces. Le systeme devrait accepter les espaces ou les tirets, puis nettoyer la valeur automatiquement en interne. Le meme probleme existe pour le code postal, qui indique "no dashes" et peut ne pas supporter certains formats de codes postaux valides dans d'autres pays.

Du point de vue **utilisabilite**, les champs obligatoires sont marques avec `*`, mais l'explication de l'asterisque est seulement en bas du formulaire. Il n'y a pas non plus d'exemple visible de messages d'erreur ou de validation inline, donc on ne sait pas clairement comment l'utilisateur corrige ses erreurs. Le bouton `Continue` est aussi ambigu pour un ecran de paiement. Il ne dit pas clairement si l'utilisateur passe a une etape de verification ou s'il soumet deja des informations de paiement.

La mise en page des champs de nom n'est pas tres claire non plus. Le champ `MI` est place entre `First Name` et `Last Name`, mais `MI` (`Middle Initial`) comme abreviation n'est pas forcement evident pour tous les utilisateurs. Un label plus clair comme `Middle Initial (optional)` serait plus facile a comprendre. Le formulaire pourrait aussi avoir une structure plus simple : `First Name`, `Middle Initial`, `Last Name`, ou alors un seul champ `Full Name` si l'initiale du milieu n'est pas vraiment necessaire.

La date d'expiration est separee en deux champs : `Month` et `Year`. Dans beaucoup de formulaires de paiement, c'est souvent un seul champ combine, par exemple `MM/YY`, ce qui est plus court, plus simple a comprendre et plus rapide a remplir pour l'utilisateur.

La position des boutons `Continue` et `Cancel` peut aussi preter a confusion. Dans beaucoup d'interfaces, l'action secondaire (`Cancel`) est placee a gauche et l'action principale (`Continue`) a droite, surtout quand l'utilisateur avance dans un flow. Ici, `Continue` apparait avant `Cancel`, ce qui peut sembler incoherent selon les conventions du produit.

Pour les **utilisateurs internationaux**, la partie adresse peut poser probleme, car il n'y a pas de champ pays alors que `State or Province` est obligatoire. Cela donne l'impression que le formulaire est pense pour une region specifique, pas pour une entreprise SaaS globale.

Le deuxieme champ sous `Credit Card Billing Street Address` n'a pas non plus de label. L'utilisateur peut ne pas comprendre si ce champ sert a entrer un appartement, une suite, un batiment, ou une ligne d'adresse optionnelle.

Il y a aussi une petite incoherence entre le label `State or Province` et le placeholder de la liste `Select a state`. Si le formulaire vise des utilisateurs internationaux, le vocabulaire devrait etre coherent.

## b. Exemples de cas de test

### Cas de test 1

| Champ | Details |
|---|---|
| **ID du cas de test** | TC-01 |
| **Titre** | Soumission reussie avec des informations de carte valides |
| **Priorite** | Haute |
| **Type** | Positif / Fonctionnel |
| **Preconditions** | L'utilisateur est sur l'ecran du widget de billing. |
| **Donnees de test** | Type de carte : VISA, numero de carte valide, date d'expiration future, adresse de facturation valide. |
| **Etapes** | 1. Selectionner `VISA` comme type de carte.<br>2. Entrer un numero de carte Visa valide.<br>3. Selectionner un mois et une annee d'expiration futurs.<br>4. Entrer prenom, nom, adresse de facturation, ville, etat/province et code postal.<br>5. Cliquer sur `Continue`. |
| **Resultat attendu** | Le formulaire accepte les donnees et deplace l'utilisateur vers l'etape suivante ou une page de confirmation. Le montant et les details de facturation sont conserves correctement, et l'utilisateur n'est pas facture plus d'une fois. |

### Cas de test 2

| Champ | Details |
|---|---|
| **ID du cas de test** | TC-02 |
| **Titre** | Une carte expiree est rejetee |
| **Priorite** | Haute |
| **Type** | Negatif / Validation |
| **Preconditions** | L'utilisateur est sur l'ecran du widget de billing. |
| **Donnees de test** | Numero de carte valide, date d'expiration dans le passe, adresse de facturation valide. |
| **Etapes** | 1. Entrer un numero de carte valide.<br>2. Selectionner un mois et une annee d'expiration dans le passe.<br>3. Remplir tous les autres champs obligatoires avec des donnees valides.<br>4. Cliquer sur `Continue`. |
| **Resultat attendu** | Le formulaire ne continue pas. Un message d'erreur inline apparait pres des champs d'expiration et explique clairement que la carte est expiree. Aucun paiement n'est soumis. |

### Cas de test 3

| Champ | Details |
|---|---|
| **ID du cas de test** | TC-03 |
| **Titre** | Le montant du paiement est clair avant de continuer |
| **Priorite** | Haute |
| **Type** | Utilisabilite / Fonctionnel |
| **Preconditions** | L'utilisateur est sur l'ecran du widget de billing. |
| **Donnees de test** | Montant affiche : `30.00`. |
| **Etapes** | 1. Regarder la zone du montant de paiement.<br>2. Verifier si la devise est affichee.<br>3. Verifier si l'ecran explique ce que l'utilisateur paie.<br>4. Verifier s'il est clair que le paiement est unique ou recurrent. |
| **Resultat attendu** | L'utilisateur comprend clairement le montant, la devise, l'objet du paiement et si le paiement est unique ou recurrent avant de cliquer sur `Continue`. |

## c. Solution produit pour le bug le plus severe

**Bug le plus severe :** le montant du paiement n'est pas assez clair.

A mon avis, le probleme visible le plus severe est que le montant du paiement est affiche seulement comme `30.00`, sans devise ni explication. Sur un ecran de paiement, l'utilisateur doit comprendre clairement ce qu'il va payer avant de continuer.

Cela peut creer de la confusion, car l'utilisateur ne sait pas si le montant est en USD, EUR ou une autre devise. Il ne sait pas non plus clairement ce qu'il paie, si c'est un paiement unique ou recurrent, ni si les taxes sont incluses.

La solution produit serait de rendre le resume du paiement plus clair. Par exemple, l'ecran pourrait afficher `Payment Amount: $30.00 USD`, puis une courte description comme `Monthly subscription` ou `One-time setup fee`. Si des taxes ou frais supplementaires peuvent s'ajouter, il faudrait aussi les afficher avant que l'utilisateur continue.

Je proposerais aussi de changer le texte du bouton si necessaire. Si l'etape suivante est seulement une verification, `Continue to Review` serait plus clair. Si le bouton soumet vraiment les informations de paiement, le texte devrait etre plus explicite.

Cette solution rend l'ecran de paiement plus transparent et aide l'utilisateur a se sentir plus en confiance avant d'entrer ses informations de paiement.
