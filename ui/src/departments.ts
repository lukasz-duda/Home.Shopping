import { ShoppingListItem } from "./model";

export const departmentItems: Record<string, string[]> = {
  "01. Warzywa": [
    "march",
    "jabłk",
    "szczypior",
    "pomidor",
    "natk",
    "pietruszk",
    "rukol",
    "por",
    "ziemniak",
    "cieci",
    "fasol",
    "cebul",
    "brokuł",
    "awokad",
    "borówk",
    "ogór",
    "szparag",
    "rzodkiew",
    "banan",
    "papryka",
    "sałat",
    "kalafior",
    "cukinia",
  ],
  "02. Słodycze": ["czekolad"],
  "03. Lodwóka": ["kisz"],
  "03. Mięsa, sery": ["kurcz", "dorsz", "łoso", "ser", "szyn", "indyk"],
  "04. Herbata, kawa, przyparawy": ["kaw", "herb"],
  "05. Makarony, kasze": ["makaron", "kasz", "ryż"],
  "06. Papier, jaja, mleko": ["papier", "jaj", "mleko"],
  "07. Kosmetyki i chemia": [
    "mydł",
    "szampon",
    "chust",
    "zęb",
    "denty",
    "płyn",
    "chust",
  ],
  "08. Napoje": ["piw", "woda", "pepsi", "sok", "jogurt kokosowy"],
  "09. Apteka": ["witamin"],
  "10. Teodor": ["urinary", "cystophan"],
  "11. Inne": [],
};

export const departments = Object.keys(departmentItems).sort();

export function getDepartment(itemName: string) {
  for (const department of departments) {
    if (
      departmentItems[department].some((departmentItem) =>
        itemName.toLowerCase().includes(departmentItem),
      )
    ) {
      return department;
    }
  }
  return departments[departments.length - 1];
}

export function findDepartmentItems(
  department: string,
  allItems: ShoppingListItem[],
) {
  return allItems.filter((item) => {
    return getDepartment(item.name) === department;
  });
}
