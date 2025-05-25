import { ShoppingListItem } from "./model";

export const departmentItems: Record<string, string[]> = {
  "01. Warzywa": [
    "march",
    "jabłk",
    "szczyp",
    "pomidor",
    "natk",
    "ruko",
    "por",
    "ziem",
    "cieci",
    "fasol",
    "cebula",
    "brok",
    "awokad",
    "borów",
    "ogór",
  ],
  "02. Słodycze": ["czeko"],
  "03. Lodwóka": ["kisz"],
  "03. Mięsa, sery": ["kur", "dorsz", "łosoś", "ser", "szyn", "ind"],
  "04. Herbata, kawa, przyparawy": ["kaw", "herb"],
  "05. Makarony, kasze": ["makar", "kasz", "ryż"],
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
  "08. Napoje": ["piw", "woda", "pepsi", "sok"],
  "09. Inne": [],
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
