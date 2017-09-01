//
//  ViewController.swift
//  jam-ios
//
//  Created by Andrew Tully on 4/8/17.
//  Copyright © 2017 EPCS-DKC-JAM. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet weak var HelpMeDecideButton: UIButton!
    @IBOutlet weak var FullMenuButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        FullMenuButton.backgroundColor = UIColor.gray
        FullMenuButton.layer.cornerRadius = 10;
        FullMenuButton.layer.borderWidth = 1;
        FullMenuButton.layer.borderColor = UIColor.black.cgColor
        FullMenuButton.layer.opacity = 0.7
        FullMenuButton.contentEdgeInsets = UIEdgeInsets(top: 20.0, left: 20.0, bottom: 20.0, right: 20.0)
        
        HelpMeDecideButton.backgroundColor = UIColor.gray
        HelpMeDecideButton.layer.cornerRadius = 10;
        HelpMeDecideButton.layer.borderWidth = 1;
        HelpMeDecideButton.layer.borderColor = UIColor.black.cgColor
        HelpMeDecideButton.layer.opacity = 0.7
        HelpMeDecideButton.contentEdgeInsets = UIEdgeInsets(top: 20.0, left: 20.0, bottom: 20.0, right: 20.0)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

