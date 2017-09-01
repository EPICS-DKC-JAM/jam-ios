//
//  FullMenuTableViewController.swift
//  jam-ios
//
//  Created by Andrew Tully on 4/13/17.
//  Copyright © 2017 EPCS-DKC-JAM. All rights reserved.
//

import UIKit

class FullMenuTableViewController: UITableViewController {

    var sections: [Section] = SectionsData().getSectionsFromData()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        tableView.contentSize.height += 1
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    
    override func numberOfSections(in tableView: UITableView) -> Int {
        return sections.count
    }
    
    override func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return sections[section].items.count
    }
    
    override func tableView(_ tableView: UITableView, titleForHeaderInSection section: Int) -> String? {
        return sections[section].heading
    }
    
    override func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "cell", for: indexPath)
        
        cell.textLabel?.text = sections[indexPath.section].items[indexPath.row]
        
        return cell;
    }
}
