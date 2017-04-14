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
        
        let beverages = Section(title: "Beverages", objects: ["Latte", "Mocha", "Jamaican Joe", "Espresso", "Hot Chocolate", "Pour Over", "Frappe", "Fruit Smoothie", "Milk Shake", "Brewsicle", "Iced Coffee", "JA Bottle Energy", "Iced Latte", "Nitro", "Iced Chai", "Oreo Blizzard", "Affogato", "Americano"])
        let foods = Section(title: "Foods", objects: ["Cheesecake", "Cookie", "Salad", "Sandwich", "Wrap", "Cinnamon Roll"])
        let beans = Section(title: "Beans", objects: ["Roasted Beans"])
        
        sectionsArray.append(beverages)
        sectionsArray.append(foods)
        sectionsArray.append(beans)
        
        return sectionsArray
    }
}
