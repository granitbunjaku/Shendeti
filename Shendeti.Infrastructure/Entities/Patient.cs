﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shendeti.Infrastructure.Entities;

public class Patient
{
    [Key]
    [ForeignKey("User")]
    public string UserId { get; set; }
    public User User { get; set; }
}