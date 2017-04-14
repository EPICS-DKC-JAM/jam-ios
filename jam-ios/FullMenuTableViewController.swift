//
//  FullMenuTableViewController.swift
//  jam-ios
//
//  Created by Andrew Tully on 4/13/17.
//  Copyright © 2017 EPCS-DKC-JAM. All rights reserved.
//

import UIKit

class FullMenuTableViewController: UITableViewController {

    let BEVERAGES = 0
    let FOODS = 1
    let BEANS = 2
    var SectionItemMap = Array<Array<String>>()
    var Sections = ["Beverages", "FOODS", "Beans"]
    override func viewDidLoad() {
        super.viewDidLoad()
        
        for Section in Sections {
            SectionItemMap.append(Array<String>())
        }
        
        
        SectionItemMap[BEVERAGES].append("Latte")
        SectionItemMap[BEVERAGES].append("Mocha")
        SectionItemMap[BEVERAGES].append("Jamaican Joe")
        SectionItemMap[BEVERAGES].append("Espresso")
        SectionItemMap[BEVERAGES].append("Hot Chocolate")
        SectionItemMap[BEVERAGES].append("Pour Over")
        SectionItemMap[BEVERAGES].append("Frappe")
        SectionItemMap[BEVERAGES].append("Fruit Smoothie")
        SectionItemMap[BEVERAGES].append("Milk Shake")
        SectionItemMap[BEVERAGES].append("Brewsicle")
        SectionItemMap[BEVERAGES].append("Iced Coffee")
        SectionItemMap[BEVERAGES].append("JA Bottle Energy")
        SectionItemMap[BEVERAGES].append("Iced Latte")
        SectionItemMap[BEVERAGES].append("Nitro")
        SectionItemMap[BEVERAGES].append("Iced Chai")
        SectionItemMap[BEVERAGES].append("Oreo Blizzard")
        SectionItemMap[BEVERAGES].append("Affogato")
        SectionItemMap[BEVERAGES].append("Americano")
        
        
        SectionItemMap[FOODS].append("Cheesecake")
        SectionItemMap[FOODS].append("Cookie")
        SectionItemMap[FOODS].append("Salad")
        SectionItemMap[FOODS].append("Sandwhich")
        SectionItemMap[FOODS].append("Wrap")
        SectionItemMap[FOODS].append("Cinnamon Roll")
        
        
        SectionItemMap[BEANS].append("Roasted Beans")
        
        SectionItemMap[BEVERAGES].sort()
        SectionItemMap[FOODS].sort()
        SectionItemMap[BEANS].sort()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return SectionItemMap.count
    }

    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return SectionItemMap[section].count
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return Sections[section]
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        cell.textLabel?.text = SectionItemMap[indexPath.section][indexPath.row]
        return cell
    }

}
