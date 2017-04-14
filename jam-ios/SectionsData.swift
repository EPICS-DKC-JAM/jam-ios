//
//  SectionsData.swift
//  jam-ios
//
//  Created by David Tong on 4/14/17.
//  Copyright © 2017 EPCS-DKC-JAM. All rights reserved.
//

import Foundation

class SectionsData {
    
    func getSectionsFromData() -> [Section] {
        var sectionsArray = [Section]()
        
        var beverages = Section(title: "Beverages", objects: ["Latte", "Mocha", "Jamaican Joe", "Espresso", "Hot Chocolate", "Pour Over", "Frappe", "Fruit Smoothie", "Milk Shake", "Brewsicle", "Iced Coffee", "JA Bottle Energy", "Iced Latte", "Nitro", "Iced Chai", "Oreo Blizzard", "Affogato", "Americano"])
        var foods = Section(title: "Foods", objects: ["Cheesecake", "Cookie", "Salad", "Sandwich", "Wrap", "Cinnamon Roll"])
        var beans = Section(title: "Beans", objects: ["Roasted Beans"])
        
        beverages.items.sort()
        foods.items.sort()
        beans.items.sort()
        
        sectionsArray.append(beverages)
        sectionsArray.append(foods)
        sectionsArray.append(beans)
        
        return sectionsArray
    }
}
