//
//  Section.swift
//  jam-ios
//
//  Created by David Tong on 4/14/17.
//  Copyright © 2017 EPCS-DKC-JAM. All rights reserved.
//

import Foundation

struct Section {
    
    var heading : String
    var items : [String]
    
    init(title: String, objects: [String]) {
        heading = title
        items = objects
    }
    
    
}
